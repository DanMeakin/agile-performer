
class QualityOverview {
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
    return totalAmountOfDefects;
  }

  calculateTotalDefectsPoints(){
    let totalAmountOfDefects = 
    this.teams.allTeams.map((team)=>{
      return team.defectsOverTimeData()
      .reduce((defectSum, criticalityTypeDefects, i) => {
        Object.values(criticalityTypeDefects.data).forEach((value) => {
          defectSum += (value * (i + 1))
        })
        return defectSum
      }, 0)
    })
    .reduce((total, teamScores)=>{
      return total + teamScores
    }, 0)
    console.log("defects", totalAmountOfDefects)
    return totalAmountOfDefects;
  }

  makeTotalIndicator(value) {
    if (value <= 10000) {
      return "GREEN";
    } else if (value <= 30000) {
      return "YELLOW";
    } else {
      return "RED";
    }
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
  totalDefectIndicator() {
    return this.makeTotalIndicator(this.calculateTotalDefectsPoints());
  }
}

export default QualityOverview;
