/**
 * Define a team retrospective assessment.
 *
 * A team retrospective assesses performance over the course of a sprint. This
 * class encapsulates the data arising from such an assessment for use within
 * metrcs.
 *
 * It comprises a happiness rating, a series of satisfaction ratings, and a
 * breakdown of the time spent on tasks during the sprint.
 *
 * @param {Date} date - The date of this report
 * @param {Integer} happiness - A happiness rating from 1-5
 * @param {Object} satisfaction - A series of satisfaction criteria, each with
 * a rating from 1-5
 * @param {Object} timeBreakdown - A series of activity types (e.g. user stories,
 * bug fixing, refactoring, unscheduled meetings, removed from team), each with
 * the total number of person-days across the whole team for each
 */
export default class Retrospective {
  constructor(date, happiness, satisfaction, timeBreakdown) {
    this.date = date;
    this.happiness = happiness;
    this.satisfaction = satisfaction;
    this.timeBreakdown = timeBreakdown;
  }

  satisfactionCriteria() {
    return Object.keys(this.satisfaction);
  }

  timeBreakdownTasks() {
    return Object.keys(this.timeBreakdown);
  }
};
