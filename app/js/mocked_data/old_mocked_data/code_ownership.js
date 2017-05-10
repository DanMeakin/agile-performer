const projectCodeOwnership = {
  chart: [
    {
      description: "Project Code Ownership",
      data: {
        "1 team": 20,
        "2 teams": 18,
        "3+ teams": 9
      }
    }
  ],
  description: {
    leadText: "Project Code Ownership measures the per-module contribution to the codebase by different Scrum teams within the project.",
    bodyText: "The chart illustrates the proportion of the codebase with commits solely from one team, from two teams, or from three or more teams."
  }
};

const teamCodeOwnership = {
  chart: [
    {
      description: "Team α Code Ownership",
      data: {
        "1 team member": 5,
        "2 team members": 7,
        "3+ team members": 2,
        "no Contribution": 25
      }
    }
  ],
  description: {
    leadText: "Team Code Ownership measures the per-module contribution to the codebase by members of one Scrum team.",
    bodyText: "The chart illustrates the proportion of the codebase with commits from this team, and the number of different team members who have made commits to a particular module."
  }
};

export { projectCodeOwnership, teamCodeOwnership };
