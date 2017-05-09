import { makePeriod } from '../lib/dates';

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
};
