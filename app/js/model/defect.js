/**
 * Define a defect discovered within a codebase.
 *
 * @param {String} description - a description of the defect
 * @param {Integer} criticality - an indicator of the severity of the defect
 * @param {Date} creationDate - the date the defect was discovered
 * @param {Date} resolutionDate - the date the defect was resolved
 */
export default class Defect {
  constructor(description, criticality, creationDate, resolutionDate) {
    this.description = description;
    this.criticality = criticality;
    this.creationDate = creationDate;
    this.resolutionDate = resolutionDate;
  }

  /**
   * Resolve this defect.
   *
   * @param {Date} resolutionDate - the date on which this defect is resolved
   */
  resolve(resolutionDate = new Date()) {
    this.resolutionDate = resolutionDate;
  }
};
