import { makePeriod, dateDiff } from '../lib/dates';
import { groupBy } from '../lib/array';

let makeBurndownTrend = (startVal, dataPoints) => {
  let delta = startVal / (Object.keys(dataPoints).length - 1);
  let trend = Object.keys(dataPoints).reduce(
    (trendLine, label, i) => {
      trendLine[label] = startVal - i * delta;
      return trendLine;
    }, {}
  );
  return trend;
};

/**
 * Calculate the total number of story points in a list of stories.
 *
 * @param {Array[UserStory]} userStories - the list of stories to carry out the
 * calculation on
 * @return {Integer} - the total number of points contained within the stories
 */
let sumStoryPoints = userStories => (
  (userStories || []).reduce((runningTotal, currentStory) => (
    runningTotal + currentStory.storyPoints
  ), 0)
);

/**
 * Define a sprint within an agile development.
 *
 * @param {Team} team - the team undertaking this sprint
 * @param {Integer} number - the number of this sprint within the development
 * @param {Array[UserStory]} userStories - the user stories within this sprint
 * @param {Date} startDate - the date on which the sprint commences
 * @param {Date} endDate - the date on which the sprint ends
 */
export default class Sprint {
  constructor(team, number, userStories, startDate, endDate) {
    this.team = team;
    this.number = number;
    this.userStories = userStories;
    this.period = makePeriod(startDate, endDate);
  }

  /**
   * Calculate the total story points committed to in this Sprint.
   *
   * @returns {Integer} - total committed story points
   */
  committedStoryPoints() {
    return sumStoryPoints(this.userStories);
  }

  /**
   * Calculate the total story points completed in this Sprint.
   *
   * If this Sprint is still in progress, this function returns the total
   * completed to date.
   *
   * @returns {Integer} - total completed story points
   */
  completedStoryPoints() {
    let completedStories = this.userStories.filter(story => (
      story.dateDone
    ));
    return sumStoryPoints(completedStories);
  }

  /**
   * Calculate the total story points from completed additional stories.
   *
   * Additional stories are those which are out of the original scope for a
   * release, but have been added anyway.
   *
   * @returns {Integer} - total completed additional story points
   */
  additionalStoryPoints() {
    let additionalStories = this.userStories.filter(story => (
      story.isAdditional && story.dateDone
    ));
    return sumStoryPoints(additionalStories);
  }

  /**
   * Group and list story completions by date.
   *
   * This function groups all user stories by the date on which they were
   * completed. An array is returned, where the index is the number of days from
   * sprint commencement on which the story was complete. For example, a story
   * completed on the third day of the sprint will be found within an array of
   * stories at index 3 of the array.
   *
   * @returns {Array[Array[UserStory]]} - a nested array of user stories,
   * grouped by completion date
   */
  storyCompletions() {
    let grouped = groupBy(this.userStories, story => dateDiff(story.dateDone, this.period[0])),
        days = [...Array(dateDiff(this.period[0], this.period[this.period.length - 1])).keys()];
    return days.map(dayNumber => (
      grouped[dayNumber]
    ));
  }

  /**
   * Calculate the number of story points completed each day.
   *
   * Similarly to storyCompletions(), this indexes by day of the sprint the
   * number of story points completed in a given day.
   *
   * @returns {Array[Integer]} - a list of story points completed each day
   */
  completedPointsByDay() {
    return this.storyCompletions().map(stories => (
      sumStoryPoints(stories)
    ));
  }

  /**
   * Calculate the burndown over the course of this sprint.
   *
   * @returns {Array[Integer]} - a list of the number of remaining story points
   * at the end of each day of a sprint
   */
  burndown() {
    return this.completedPointsByDay().reduce((dailyCumulative, currPoints) => {
      let init = this.committedStoryPoints(),
          previousTotal = dailyCumulative[dailyCumulative.length - 1] || init,
          newTotal = previousTotal - currPoints;
      dailyCumulative.push(newTotal);
      return dailyCumulative;
    }, []);
  }

  /**
   * Generate burndown data for use in charts.
   *
   * @returns {Array[Object]} - burndown data for use in a sprint burndown 
   */
  burndownData() {
    let remaining = this.burndown().reduce((data, points, idx) => {
      data[idx] = points;
      return data;
    }, {});
    return [
      {
        description: "Ideal Burndown",
        data: makeBurndownTrend(this.committedStoryPoints(), remaining),
        chartType: "line",
        borderDash: [10, 5]
      },
      {
        description: "Remaining Effort",
        data: remaining
      }
    ];
  }
};
