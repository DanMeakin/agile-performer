import { shortDate } from '../../../lib/dates';

export default class Overview {
  constructor(teams) {
    this.teams = teams;
  }

  allIndicators() {
    return this.teams.reduce((all, team) => {
      all[team.name] = this.teamIndicators(team.name);
      return all;
    }, {});
  }

  allCriteria() {
    return this.teams[0].satisfactionAssessments[0].satisfactionCriteria();
  }

  allHappinessAssessments() {
    let nestedAssessments = this.teams.map(team => team.happinessAssessments);
    return [].concat.apply([], nestedAssessments);
  }

  averageHappiness() {
    let firstTeamAssessments = this.teams[0].happinessAssessments,
        allAssessments = this.allHappinessAssessments();
    console.log("All assessments", allAssessments);
    let totalObj = allAssessments.reduce((output, assessment) => {
      let prevVal = output[shortDate(assessment.date)] || [0, 0],
          newVal = [prevVal[0] + assessment.happiness, prevVal[1] + 1];
      output[shortDate(assessment.date)] = newVal;
      return output;
    }, {});
    return Object.keys(totalObj).reduce((output, key) => {
      let [total, count] = totalObj[key];
      output[key] = total / count;
      return output;
    }, {});
  }

  relevantSatisfactionAssessments(teamName) {
    let team = this.teams.find(team => team.name == teamName);
    return team.satisfactionAssessments.slice(-2);
  }

  satisfactionIndicator(teamName) {
    let assessments = this.relevantSatisfactionAssessments(teamName),
        startingPoints = assessments[0].averageSatisfaction(),
        endingPoints = assessments[1].averageSatisfaction(),
        trend;
    if (endingPoints > startingPoints) {
      trend = "INCREASING";
    } else if (endingPoints < startingPoints) {
      trend = "DECREASING";
    } else {
      trend = "STEADY";
    }
    return this.makeIndicator(trend, endingPoints);
  }

  relevantHappinessAssessments(teamName) {
    let team = this.teams.find(team => team.name == teamName);
    return team.happinessAssessments.slice(-2);
  }

  happinessIndicator(teamName) {
    let assessments = this.relevantHappinessAssessments(teamName),
        startingPoints = assessments[0].happiness,
        endingPoints = assessments[1].happiness,
        trend;
    if (endingPoints > startingPoints) {
      trend = "INCREASING";
    } else if (endingPoints < startingPoints) {
      trend = "DECREASING";
    } else {
      trend = "STEADY";
    }
    return this.makeIndicator(trend, endingPoints);
   
  }

  makeIndicator(trend, currentPoints) {
    let colour = () => {
        if (currentPoints >= 3.5) {
          return "GREEN";
        } else if (currentPoints >= 2) {
          return "YELLOW";
        } else {
          return "RED";
        }
      return "???";
    };
    return {
      trend,
      colour: colour(trend)
    };
  }
}
