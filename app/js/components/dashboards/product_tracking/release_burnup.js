import {
  makePeriod,
  shortDate
} from '../../../lib/dates';
import {
  groupBy
} from '../../../lib/array';
import RGB from '../../../lib/rgb';

class ReleaseBurnup {
  constructor(release) {
    this.release = release;
  }

  startDate() {
    return this.release.startDate();
  }

  endDate() {
    return this.release.endDate();
  }

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

  burnupDates() {
    let excludeNonFridays = date => date.getDay() != 5,
      dates = makePeriod(this.startDate(), this.finalSprintEndDate(), excludeNonFridays);
    return dates;
  }

  releaseDates() {
    let excludeNonFridays = date => date.getDay() != 5,
        dates = makePeriod(this.startDate(), this.endDate(), excludeNonFridays);
    return dates;
  }

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

  teamBars() {
    return Object.keys(this.cumulativePointsByTeam()).map(teamName => ({
      description: "Team " + teamName,
      data: this.cumulativePointsByTeam()[teamName]
    }));
  }

  releaseScope() {
    let data = this.totalPointsByWeek().reduce((chartData, { date, points }) => {
      chartData[shortDate(date)] = points;
      return chartData;
    }, {});
    return {
      description: "Release Scope",
      data,
      chartType: "line",
      lineTension: 0,
      borderColor: new RGB(0, 0, 0)
    };
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
    let burnup =
        this.teamBars().concat([this.releaseScope()]);
    console.log("Burnup", burnup);
    return burnup;
  }
}

const releaseBurnup = release => (new ReleaseBurnup(release)).releaseBurnup();

export default releaseBurnup;
