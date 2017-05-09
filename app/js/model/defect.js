/**
 * Define a defect discovered within a codebase.

 * @param {Date} creationDate - the date the defect was discovered
 * @param {Integer} criticality - an indicator of the severity of the defect
 */
export default class Defect {
  constructor(criticality, creationDate = new Date()) {
    this.criticality = criticality;
    this.creationDate = creationDate;
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
