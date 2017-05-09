/**
 * Define a team happiness assessment.
 *
 * This assessment is used to log the current happiness of a given team.
 *
 * @param {Float} happiness - A happiness rating between 1-5
 * @param {Date} Date - The date on which the assessment takes place
 */
export default class Happiness {
  constructor(happiness, date = new Date()) {
    this.happiness = happiness;
    this.date = date;
  }
}
