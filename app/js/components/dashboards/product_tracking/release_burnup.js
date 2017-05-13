import {
  makePeriod,
  shortDate,
  addDays
} from '../../../lib/dates';
import {
  groupBy
} from '../../../lib/array';
import RGB from '../../../lib/rgb';

const excludeNonFridays = date => date.getDay() != 5;

class ReleaseBurnup {
  constructor(release) {
    this.release = release;
  }

  startDate() {
    return this.release.startDate();
  }

  /**
   * The scheduled end date for this release.
   *
   * @returns {Date}
   */
  endDate() {
    return this.release.endDate();
  }

  /**
   * Return the end date of the final sprint in this release, or the end of any
   * sprints currently in progress.
   *
   * @returns {Date}
   */
  finalSprintEndDate() {
    return this.release.finalSprintEndDate();
  }

  /**
   * List all user stories relating to this release.
   *
   * @returns {Array[UserStory]} - a list of all user stories contained within
   * this release
   */
  allUserStories() {
    let sprintsStories = this.release.sprints.map(sprint => (
      sprint.userStories.map(story => {
        story.team = sprint.team;
        return story;
      })
    ));
    return [].concat.apply([], sprintsStories, this.release.userStories);
  }

  /**
   * The dates to use in the burnup chart.
   *
   * Burnup uses Fridays for tracking dates. This lists all Fridays during the
   * release, up to the last Friday of any sprints currently in progress.
   *
   * @returns {Array[Date]}
   */
  burnupDates() {
    let dates = makePeriod(
      this.startDate(),
      this.finalSprintEndDate(),
      excludeNonFridays
    );
    return dates;
  }

  /**
   * The dates to use for tracking release scope.
   *
   * This is different from burnupDates, in that we wish to have all Fridays
   * until the scheduled release included. This function returns an array
   * containing all of these Fridays.
   *
   * @returns {Array[Date]}
   */
  releaseDates() {
    let dates = makePeriod(
      this.startDate(),
      this.endDate(),
      excludeNonFridays
    );
    return dates;
  }

  /**
   * The dates to use for release trajectory.
   *
   * The release trajectory runs from the last set of actual figures, until the
   * content of the release is likely to be completed. Because we want to ensure
   * that the final sprint end date is included within these dates, we deduct
   * six days from this date. This ensures that it will be included.
   *
   * @returns {Array[Date]}
   */
  releaseTrajectoryDates() {
    let dates = makePeriod(
      addDays(this.finalSprintEndDate(), - 6),
      this.endDate(),
      excludeNonFridays
    );
    return dates;
  }

  /**
   * List all stories completed by the Friday of a given week.
   *
   * This function is cumulative, returning all stories completed during the
   * release before or on the given date.
   *
   * @returns {Array[Object]} - an array of objects containing date and stories
   * keys
   */
  storiesByWeek() {
    return this.burnupDates().map(date => {
      let stories = this.allUserStories().filter(story =>
        story.dateDone <= date
      );
      return {
        date,
        stories
      };
    });
  }

  /**
   * List the total story points within the sprint by week.
   *
   * This function counts the total points included within the release as at
   * the end of each week. It does not count completed stories; for that, see
   * cumulativePointsByWeek.
   *
   * @returns {Array[Object]} - a list of objects, each with a date and total
   * story points values
   */
  totalPointsByWeek() {
    return this.releaseDates().map(date => {
      let stories = this.allUserStories().filter(story =>
                                                 story.dateAdded <= date || !story.dateAdded
                                                ),
          points = stories.reduce((total, story) => total + story.storyPoints, 0);
      return {
        date,
        points
      };
    });
  }

  /**
   * List the cumulative total number of story points complete at the end of
   * each week.
   *
   * @returns {Array[Object]} - a list of objects, each with a date and total
   * points count completed
   */
  cumulativePointsByWeek() {
    return this.cumulativePointsByDateAndTeam().map(({ date, points }) => {
      let totalPoints = Object.keys(points).reduce((total, teamName) => (
        total += points[teamName]
      ), 0);
      return {
        date,
        points: totalPoints
      };
    });
  }

  /**
   * List the cumulative total number of story points complete at the end of
   * each week, broken-down by team.
   *
   * @returns {Array[Object]} - a list of objects, each with a date and points
   * object, the latter containing a per-team breakdown of points complete
   */
  cumulativePointsByDateAndTeam() {
    return this.storiesByWeek().map(({ date, stories }) => {
      let teamStories = groupBy(stories, story => story.team.name),
        teamPoints = Object.keys(teamStories).reduce((allPoints, teamName) => {
          let stories = teamStories[teamName],
            totalPoints = stories.reduce((total, story) => total + story.storyPoints, 0);
          allPoints[teamName] = totalPoints;
          return allPoints;
        }, {});
      return {
        date,
        points: teamPoints
      };
    });
  }

  /**
   * List the cumulative total points over a time period, indexed by team.
   *
   * @returns {Object} - an object with team names as keys, and objects as
   * values, each value object containing dates associated with total points
   * completed by that team by that date
   */
  cumulativePointsByTeam() {
    return this.cumulativePointsByDateAndTeam().reduce((chartData, { date, points }) => {
      Object.keys(points).forEach(teamName => {
        let teamData = chartData[teamName] || {};
        teamData[shortDate(date)] = points[teamName];
        chartData[teamName] = teamData;
      });
      return chartData;
    }, {});
  }

  /**
   * Generates a set of chart data breaking down progress by team by date.
   *
   * Uses cumulativePointsByTeam to obtain data, and reformats it for use within
   * a chart.
   *
   * @returns {Array[Object]} - chart data for plotting team progress over time
   */
  teamBars() {
    return Object.keys(this.cumulativePointsByTeam()).map(teamName => ({
      description: "Team " + teamName,
      data: this.cumulativePointsByTeam()[teamName]
    }));
  }

  /**
   * Generates a set of chart data for overall progress on release burnup.
   *
   * @returns {Array[Object]} - chart data for a single bar chart plotting
   * progress burning up the release
   */
  totalBars() {
    let data = this.cumulativePointsByWeek().reduce((pointsData, { date, points }) => {
      pointsData[shortDate(date)] = points;
      return pointsData;
    }, {});
    return [{
      description: "Completed Points",
      data,
      yAxisID: "bars"
    }];
  }

  /**
   * Generates a set of chart data for a scope line chart.
   *
   * The scope line plots overall release scope over time, illustrating where
   * additions are made to original scope.
   *
   * @returns {Array[Object]} - chart data for a scope line chart
   */
  releaseScope() {
    let data = this.totalPointsByWeek().reduce((chartData, { date, points }) => {
      chartData[shortDate(date)] = points;
      return chartData;
    }, {});
    return [{
      description: "Release Scope",
      data,
      chartType: "line",
      lineTension: 0,
      steppedLine: true,
      borderColor: new RGB(0, 0, 0),
      borderDash: [10, 4],
      yAxisID: "lines"
    }];
  }

  /**
   * Generates a set of chart data for plotting release trajectory.
   *
   * Release trajectory illustrates the likely completion time for a release,
   * based on burn-up rates over the release. It provides a "cone of
   * uncertainty" for this purpose, illustrating best- and worst-case outcomes.
   */
  releaseTrajectory() {
    let cumulativePoints = this.cumulativePointsByWeek(),
        currentCompletion = cumulativePoints[cumulativePoints.length - 1].points,
        weeklyPoints = cumulativePoints.map(({ date, points }, idx, allPoints) => {
      let previousPoints = idx == 0 ? 0 : allPoints[idx - 1].points;
      return {
        date,
        points: points - previousPoints
      };
    }),
        selectedPoints = weeklyPoints.slice(-6).map(entry => entry.points),
        averageWeeklyPoints = selectedPoints.reduce((total, points) => {
          return total + points;
        }, 0) / selectedPoints.length,
        minWeeklyPoints = Math.min.apply(null, selectedPoints),
        maxWeeklyPoints = Math.max.apply(null, selectedPoints),
        valuesAtDates = this.releaseTrajectoryDates().map((date, idx) => {
      return {
        date,
        average: currentCompletion + averageWeeklyPoints * idx,
        maximum: currentCompletion + maxWeeklyPoints * idx,
        minimum: currentCompletion + minWeeklyPoints * idx
      };
        }),
        [avgTrend, minTrend, maxTrend] = valuesAtDates.reduce(([avgs, mins, maxs], { date, average, minimum, maximum}) => {
          avgs[shortDate(date)] = average;
          mins[shortDate(date)] = minimum;
          maxs[shortDate(date)] = maximum;
          return [avgs, mins, maxs];
        }, [{}, {}, {}]);
    return [
      {
        description: "Trajectory (Average)",
        data: avgTrend,
        chartType: "line",
        yAxisID: "lines"
      },
      {
        description: "Trajectory (Best Case)",
        data: maxTrend,
        chartType: "line",
        yAxisID: "lines"
      },
      {
        description: "Trajectory (Worst Case)",
        data: minTrend,
        chartType: "line",
        yAxisID: "lines"
      }
    ];
  }

  /**
   * Generate a set of data representing a release burn-up chart.
   *
   * A release burn-up consists of a series of bars, each of which indicates
   * the amount of progress made in story points by each team. It also includes
   * a line showing committed story points for this release. Additionally, it
   * includes a vertical line illustrating the scheduled release date (actual
   * stats).
   *
   * In addition to the actual stats, the burn-up contains projections.
   */
  releaseBurnup() {
    this.releaseTrajectory();
    let burnup =
        this.teamBars().concat(this.releaseScope(), this.releaseTrajectory());
    console.log("Burnup", burnup);
    return burnup;
  }
}

const releaseBurnup = release => (new ReleaseBurnup(release)).releaseBurnup();

export default releaseBurnup;
