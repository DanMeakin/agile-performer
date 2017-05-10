// Maturity assessment stages.
const maturity = {
  adoption: 1,
  adaptation: 2,
  acceptance: 3,
  routinisation: 4,
  infusion: 5
};

class Practices {
  /**
   * Define a team practices assessment.
   *
   * Each set of practices consists of an object whose keys are practices, and
   * whose values is a maturity assessment. The latter should be set using
   * the maturity constants.
   *
   * @param {Object} scrumAssessment - A series of Scrum practices with maturity
   * assessments
   * @param {Object} xpAssessment - A series of XP practices with maturity
   * assessments
   * @param {Object} otherAssessment - A series of other practices (i.e. not
   * Scrum or XP) with maturity assessments
   * @param {Date} date - The date of the assessment
   */
  constructor(scrumAssessment, xpAssessment = {}, otherAssessment = {}, date = new Date()) {
    this.scrumAssessment = scrumAssessment;
    this.xpAssessment = xpAssessment;
    this.otherAssessment = otherAssessment;
    this.date = date;
  }

  get scrumPractices() {
    return Object.keys(this.scrumAssessment);
  }

  get xpPractices() {
    return Object.keys(this.xpAssessment);
  }

  get otherPractices() {
    return Object.keys(this.otherAssessment);
  }
};

export { Practices, maturity };
