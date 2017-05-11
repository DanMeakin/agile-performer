import {
  shortDate
} from '../lib/dates';

/**
 * Define a Scrum team.

 * @param {String} name - the name of the team
 */
export default class Team {
  constructor(name) {
    this.name = name;
    // Initialise a series of arrays for collecting data on the team.
    this.practiceAssessments = [];
    this.defects = [];
    this.happinessAssessments = [];
    this.satisfactionAssessments = [];
    this.timeBreakdowns = [];
  }

  /**
   * Add a practices assessment to this team.
   *
   * @param {Practices} practices - One practices assessment for this team
   */
  addPracticeAssessment(practices) {
    this.practiceAssessments.push(practices);
  }

  /**
   * Add a defect for this team.
   *
   * @param {Defect} defect - A defect assigned to this team
   */
  addDefect(defect) {
    this.defects.push(defect);
  }

  /**
   * Add a happiness assessment for this team.

   * @param {Happiness} happiness - A happiness assessment for this team
   */
  addHappinessAssessment(happiness) {
    this.happinessAssessments.push(happiness);
  }

  /**
   * Add a satisfaction assessment for this team.
   *
   * @param {Satisfaction} satisfaction - A satisfaction assessment for this team
   */
  addSatisfactionAssessment(satisfaction) {
    this.satisfactionAssessments.push(satisfaction);
  }

  /**
   * Add a time breakdown for this team.
   *
   * @param {TimeBreakdown} breakdown - A time breakdown for this team
   */
  addTimeBreakdown(breakdown) {
    this.timeBreakdowns.push(breakdown);
  }

  /**
   * Generate a set of happiness data for this team, for use in charts.
   *
   * @returns {Array[Object]} - A set of chart data for a happiness index chart
   */
  happinessData() {
    let data = this.happinessAssessments.reduce((allAssessments, happinessAssessment) => {
      allAssessments[shortDate(happinessAssessment.date)] = happinessAssessment.happiness;
      return allAssessments;
    }, {});
    return [{
      description: "Happiness",
      data
    }];
  }

  satisfactionData() {
    let criteria = this.satisfactionAssessments[0].satisfactionCriteria(),
      dataForCriterion = criterion => {
        let dataset = this.satisfactionAssessments.reduce((all, assessment) => {
          all[shortDate(assessment.date)] = assessment.satisfaction[criterion];
          return all;
        }, {});
        return {
          description: criterion,
          data: dataset
        };
      },
      data = criteria.map(dataForCriterion);
    return data;
  }
};
