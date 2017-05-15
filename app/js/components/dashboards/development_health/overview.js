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

  relevantAssessments(teamName) {
    let team = this.teams.find(team => team.name == teamName);
    return team.satisfactionAssessments.slice(-2);
  }

  teamIndicators(teamName) {
    let assessments = this.relevantAssessments(teamName),
        criteria = this.allCriteria();
    return criteria.reduce((all, criterion) => {
      let startingPoints = assessments[0].satisfaction[criterion],
          endingPoints = assessments[1].satisfaction[criterion],
          trend;
      if (endingPoints > startingPoints) {
        trend = "INCREASING";
      } else if (endingPoints < startingPoints) {
        trend = "DECREASING";
      } else {
        trend = "STEADY";
      }
      all[criterion] = this.makeIndicator(trend, endingPoints);
      return all;
    }, {});
  }

  indicator(teamName, criterion) {
    return this.teamIndicators(teamName)[criterion];
  }

  makeIndicator(trend, currentPoints) {
    let colour = (trendDesc) => {
      switch(trendDesc) {
      case "INCREASING":
        if (currentPoints >= 3.5) {
          return "GREEN";
        } else {
          return "YELLOW";
        }
      case "STEADY":
        if (currentPoints >= 3.5) {
          return "GREEN";
        } else if (currentPoints >= 2) {
          return "YELLOW";
        } else {
          return "RED";
        }
      case "DECREASING":
        if (currentPoints >= 3.5) {
          return "YELLOW";
        } else {
          return "RED";
        }
      };
      return "???";
    };
    return {
      trend,
      colour: colour(trend)
    };
  }
}
