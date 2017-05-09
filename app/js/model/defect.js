/**
 * Define a defect discovered within a codebase.

 * @param {Date} creationDate - the date the defect was discovered
 * @param {Integer} criticality - an indicator of the severity of the defect
 * @param {Team} teamAssigned - the team assigned to resolve the defect
 */
export default class Defect {
  constructor(criticality, teamAssigned, creationDate = new Date()) {
    this.criticality = criticality;
    this.teamAssigned = teamAssigned;
    this.creationDate = creationDate;
  }
};
