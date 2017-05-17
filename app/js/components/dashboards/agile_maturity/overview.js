class AgileOverview {
  constructor(release, teams) {
    this.release = release;
    this.teams = teams;
  }

  calculateMaturityIndication(teamName) {
    let team = this.teams.allTeams.filter(team => team.name == teamName);
    let practicesTrend = team[0].practiceAssessments.reduce(this.calculateMaturityReducer, []);
    return practicesTrend[practicesTrend.length - 1];
  }

  calculateTotalMaturity() {
    let totalMaturity = this.teams.allTeams.map((team) => {
      let practicesTrend = team.practiceAssessments.reduce(this.calculateMaturityReducer, [])
      .reduce((total, teamTrend) => {
        return total + ((teamTrend || 0) / this.teams.allTeams.length);
      }, 0);
      return practicesTrend;
    });
    console.log("Total maturity", totalMaturity);
    return totalMaturity;
  }

  calculateMaturityReducer(assessments, practices, i) {
    let scrumTotal = Object.values(practices.scrumAssessment).reduce((total, valueInAssesment) => {
      return total + valueInAssesment;
    }, 0),
        xpTotal = Object.values(practices.xpAssessment).reduce((total, valueInAssesment) => {
      return total + valueInAssesment;
        }, 0),
        practiceCount = Object.keys(practices.scrumAssessment).length + Object.keys(practices.xpAssessment).length;
    console.log("Calc mat reducer", { scrumTotal, xpTotal, practiceCount });
    assessments[i] = (scrumTotal + xpTotal) / practiceCount;
    return assessments;
  }
  
  makeIndicator(value) {
    if (value >= 3.5) {
      return "GREEN";
    } else if (value >= 2.5) {
      return "YELLOW";
    } else {
      return "RED";
    }
  }

  maturityIndicator(teamName) {
    return this.makeIndicator(this.calculateMaturityIndication(teamName));
  }

  totalMaturityIndicator() {
    return this.makeIndicator(this.calculateTotalMaturity());
  }
}

export default AgileOverview;
