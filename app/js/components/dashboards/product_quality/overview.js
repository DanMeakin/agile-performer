
class Overview {
  constructor(release, teams) {
    this.release = release;
    this.teams = teams;
  }
  calculateDefectsIndicator(teamName) {
    let team = this.teams.allTeams.filter(team => team.name == teamName)
    let totalAmountOfDefects = team[0].defectsOverTimeData()
      .reduce((defectSum, criticalityTypeDefects, i) => {
        Object.values(criticalityTypeDefects.data).forEach((value) => {
          defectSum += (value * (i + 1))
        })
        return defectSum
      }, 0)
    console.log("defects", totalAmountOfDefects)
    return totalAmountOfDefects;
  }

  makeIndicator(value) {
    if (value <= 4205) {
      return "GREEN";
    } else if (value <= 5100) {
      return "YELLOW";
    } else {
      return "RED";
    }
  }

  defectIndicator(teamName) {
    return this.makeIndicator(this.calculateDefectsIndicator(teamName));
  }
}

export default Overview;
