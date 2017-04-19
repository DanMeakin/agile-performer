let getProjectCodeOwnershipLeadText = () => {
  return "Project Code Ownership measures the per-module contribution to the codebase by different Scrum teams within the project."
}, getProjectCodeOwnershipBreadText = () => {
  return "A team can be either a <em>Major</em> or a <em>Minor</em> contributor to a module within the codebase (or it may not be a contributor to that module at all). A <em>Major</em> contributor is a team which has made 5% or more of all commits to that module; a <em>Minor</em> contributor is a team making less than 5% of all commits."
}


const projectCodeOwnership = {
  chart: [
    {
      description: "Project Code Ownership",
      data: {
        "Major × 1": 20,
        "Major × 2+": 6,
        "Major × 1, Minor × 1": 12,
        "Major × 1, Minor × 2+": 8,
        "all Minor": 1
      }
    }
  ],
  description: {
    leadText: getProjectCodeOwnershipLeadText(),
    breadText: getProjectCodeOwnershipBreadText()
  }
};

let getTeamCodeOwnershipLeadText = () => {
  return "Team Code Ownership measures the per-module contribution to the codebase by members of one Scrum team."
}, getTeamCodeOwnershipInfoText = () => {
  return "A team member can be either a <em>Major</em> or a <em>Minor</em> contributor to a module within the codebase (or it may not be a contributor to that module at all). A <em>Major</em> contributor is a team which has made 5% or more of all commits to that module; a <em>Minor</em> contributor is a team making less than 5% of all commits."
}

const teamCodeOwnership = {
  chart: [
    {
      description: "Team α Code Ownership",
      data: {
        "Major × 1": 5,
        "Major × 2+": 1,
        "Major × 1, Minor × 1": 6,
        "Major × 1, Minor × 2+": 2,
        "all Minor": 0,
        "no Contribution": 25
      },
    }
  ],
  description: {
    leadText: getTeamCodeOwnershipLeadText(),
    breadText: getTeamCodeOwnershipInfoText()
  }
};

export { projectCodeOwnership, teamCodeOwnership };
