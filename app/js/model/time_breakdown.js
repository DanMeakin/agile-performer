/**
 * Define a team time breakdown.
 *
 * A team time breakdown illustrates the approximate time spent by the team
 * on different activities during a sprint.
 *
 * @param {Object} breakdown - A series of activity types (e.g. user stories,
 * bug fixing, refactoring, unscheduled meetings, removed from team), each with
 * the total number of person-days across the whole team for each
 * @param {Date} date - The date of this report
 */
export default class TimeBreakdown {
  constructor(breakdown, date = new Date()) {
    this.breakdown = breakdown;
    this.date = date;
  }

  /**
   * List the tasks contained within this breakdown.
   *
   * @returns {Array[String]} - a list of the tasks contained within this
   * breakdown 
   */
  tasks() {
    return Object.keys(this.breakdown);
  }
}
