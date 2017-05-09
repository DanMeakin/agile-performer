/**
 * Define a team retrospective assessment.
 *
 * A team retrospective assesses performance over the course of a sprint. This
 * class encapsulates the data arising from such an assessment for use within
 * metrics.
 *
 * It comprises a series of satisfaction ratings and a
 * breakdown of the time spent on tasks during the sprint.
 *
 * @param {Object} satisfaction - A series of satisfaction criteria, each with
 * a rating from 1-5
 * @param {Object} timeBreakdown - A series of activity types (e.g. user stories,
 * bug fixing, refactoring, unscheduled meetings, removed from team), each with
 * the total number of person-days across the whole team for each
 * @param {Date} date - The date of this report
 */
export default class Retrospective {
  constructor(satisfaction, timeBreakdown, date = new Date()) {
    this.satisfaction = satisfaction;
    this.timeBreakdown = timeBreakdown;
    this.date = date;
  }

  satisfactionCriteria() {
    return Object.keys(this.satisfaction);
  }

  timeBreakdownTasks() {
    return Object.keys(this.timeBreakdown);
  }
};
