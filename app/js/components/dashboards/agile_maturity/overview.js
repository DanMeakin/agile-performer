
class AgileOverview {
  constructor(release, teams) {
    this.release = release;
    this.teams = teams;
  }

  calculateMaturityIndication(teamName){
    let team = this.teams.allTeams.filter(team => team.name == teamName)
    let practicesTrend = team[0].practiceAssessments.reduce((assessments, practices, i) => {
      let scrumTotal = Object.values(practices.scrumAssessment).reduce((total, valueInAssesment) => {
        return total + valueInAssesment;
      }, 0)
      assessments[i] = scrumTotal / Object.values(practices.scrumAssessment).length
      let xpTotal = Object.values(practices.xpAssessment).reduce((total, valueInAssesment) => {
        return total + valueInAssesment;
      }, 0)
      assessments[i] = xpTotal / Object.values(practices.xpAssessment).length
      return assessments;
    }, [])
    console.log("tea,", practicesTrend)
    return practicesTrend[practicesTrend.length-1]
  }

  calculateTotalMaturity(){
    let totalMaturity = this.teams.allTeams.map((team)=>{
      let practicesTrend = team.practiceAssessments.reduce((assessments, practices, i) => {
      let scrumTotal = Object.values(practices.scrumAssessment).reduce((total, valueInAssesment) => {
        return total + valueInAssesment;
      }, 0)
      assessments[i] = scrumTotal / Object.values(practices.scrumAssessment).length
      let xpTotal = Object.values(practices.xpAssessment).reduce((total, valueInAssesment) => {
        return total + valueInAssesment;
      }, 0)
      assessments[i] = xpTotal / Object.values(practices.xpAssessment).length
      return assessments;
    }, [])
    console.log("maturitiy", practicesTrend)
    return practicesTrend[practicesTrend.length-1]
  })
  .reduce((total, teamTrend)=>{
    return total + ((teamTrend || 0)/this.teams.allTeams.length)
  }, 0)
  console.log("maturitiy", totalMaturity)
  return totalMaturity;
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

  totalMaturityIndicator(){
    return this.makeIndicator(this.calculateTotalMaturity());
  }
}

export default AgileOverview;
