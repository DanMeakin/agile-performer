import {
  shortDate,
  addDays,
  makePeriod
} from '../lib/dates';
import { groupBy } from '../lib/array';

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
    this.repositories = [];
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

  scrumPracticesData() {
    let criteria = this.practiceAssessments[0].scrumPractices(),
      dataForCriterion = criterion => {
        let dataset = this.practiceAssessments.reduce((all, practices) => {
          all[shortDate(practices.date)] = practices.scrumAssessment[criterion];
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

  xpPracticesData() {
    let criteria = this.practiceAssessments[0].xpPractices(),
      dataForCriterion = criterion => {
        let dataset = this.practiceAssessments.reduce((all, practices) => {
          all[shortDate(practices.date)] = practices.xpAssessment[criterion];
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

  otherPracticesData() {
    let criteria = this.practiceAssessments[0].otherPractices(),
      dataForCriterion = criterion => {
        let dataset = this.practiceAssessments.reduce((all, practices) => {
          all[shortDate(practices.date)] = practices.otherAssessment[criterion];
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

  sprintInterferenceData() {
    let criteria = this.timeBreakdowns[0].tasks(),
      dataForCriterion = criterion => {
        let dataset = this.timeBreakdowns.reduce((all, breakdowns) => {
          all[shortDate(breakdowns.date)] = breakdowns.breakdown[criterion];
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
  /**
   * Will sort a JSON object by its keys in ascending order
   * @param {Object} object 
   */
  sortObjectAscending(object) {
    let sortedObject = Object.keys(object)
      .sort()
      .reduce((data, key) => {
        data[key] = object[key];
        return data;
      }, {});
    return sortedObject;
  }

  codeOwnershipData() {
    let codeOwnershipData = this.repositories.reduce((data, repository) => {
      let key = repository.contributors.length + " teammembers";
      if (key in data) {
        data[key]++;
      } else {
        data[key] = 1;
      }
      return data;
    }, {}),
      sortedData = this.sortObjectAscending(codeOwnershipData);
    return [{
      description: "Team " + this.name + " code ownership",
      data: sortedData
    }];
  }

  defectsOverTimeData() {
    let defectsByCreation = groupBy(this.defects, defect => (
          defect.creationDate
        )),
      defectsByResolution = groupBy(this.defects, defect => (
          defect.resolutionDate
        )),
        firstDefectDate = new Date(
          Math.min.apply(null, this.defects.map(defect => defect.creationDate))
        ),
        defectsPeriod = makePeriod(firstDefectDate, new Date()),
        defectsByCriticality = defectsPeriod.reduce((defectsData, date) => {
      let group = defects => groupBy(defects, defect => defect.criticality),
          newDefects = group(defectsByCreation[date] || []),
          fixedDefects = group(defectsByResolution[date] || []),
          previousDate = addDays(date, -1);
      [1, 2, 3, 4, 5].forEach(criticality => {
        let thisCriticality = defectsData[criticality] || {},
            numberNewDefects = (newDefects[criticality] || []).length,
            numberResolvedDefects = (fixedDefects[criticality] || []).length,
            previousDefects = thisCriticality[shortDate(previousDate)] || 0;
        thisCriticality[shortDate(date)] = previousDefects + numberNewDefects - numberResolvedDefects;
        defectsData[criticality] = thisCriticality;
      });
      return defectsData;
    }, {});
    return Object.keys(defectsByCriticality).map(key => (
      {
        description: "Criticality " + key,
        data: defectsByCriticality[key]
      }
    ));
  }
};
