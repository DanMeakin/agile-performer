/**
 * Define a satisfaction assessment.
 *
 * @param {Object} satisfaction - A series of satisfaction criteria, each with
 * a rating from 1-5
 * @param {Date} date - The date of this report
 */
export default class Satisfaction {
  constructor(satisfaction, date = new Date()) {
    this.satisfaction = satisfaction;
    this.date = date;
  }

  satisfactionCriteria() {
    return Object.keys(this.satisfaction);
  }
};
