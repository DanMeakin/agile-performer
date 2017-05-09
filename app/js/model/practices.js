// Maturity assessment stages.
const ADOPTION = 1,
      ADAPTATION = 2,
      ACCEPTANCE = 3,
      ROUTINISATION = 4;

class Practices {
  /**
   * Define a team practices assessment.
   *
   * @param {Date} date - The date of the assessment
   * @param {Object} practices - A series of practices, each with an assessment
   * of the team's maturity in its use
   */
  constructor(date, practices) {
    this.date = date;
    this.practices = practices;
  }

  practices() {
    return Object.keys(this.practices);
  }
};

export { Practices, ADOPTION, ADAPTATION, ACCEPTANCE, ROUTINISATION };
