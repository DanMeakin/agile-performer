const ADOPTION = 1,
  ADAPTATION = 2,
  ACCEPTANCE = 3,
  ROUTINISATION = 4;

const scrumPractices = {
  chart: [
    {
      description: "Team α",
      data: {
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ROUTINISATION,
        "Definition of \"Done\"": ADOPTION,
        "Planning Poker": ACCEPTANCE,
        "Scrum of Scrums": ADAPTATION,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ACCEPTANCE,
        "Product Owner": ADOPTION
      }
    },
  ],
  description: {
    leadText: "The practices metric visualizes the rate of agile practice assimilation in the team. The data is inserted by the team itself",
    bodyText: "<div>The chart operates with 4 stages of agile assimilation for each practice in use:<ul><li><em>Adoption</em>, the decision to adopt a practice has been made;</li><li><em>Adaptation</em>, the practice is being put to use, and team members are trained to use the practice;</li><li><em>Acceptance</em>, the team members are commited to using the innovation;</li><li><em>Routinisation</em>, usage of the practice is now encouraged as a normal activity, and is no longer defined as something out of the ordinary.</li></ul></div>"
  }
}
//  { description: "Team β",
//    data: {
//      "Daily scrum": ACCEPTANCE,
//      "Definition of \"Done\"": ACCEPTANCE
//    }
//  }

const xpPractices = {
  chart: [
    {
      description: "Team α",
      data: {
        "Pair Programming": ROUTINISATION,
        "Refactoring": ACCEPTANCE,
        "Simple Design": ADOPTION,
        "Small Releases": ACCEPTANCE,
        "Collective Ownership": ADAPTATION,
        "Continuous Integration": ADOPTION,
        "40-hour Week": ACCEPTANCE,
        "Test-driven Development": ADAPTATION,
        "User Stories": ACCEPTANCE
      }
    }
  ],
  description: {
    leadText: "The practices metric visualizes the rate of agile practice assimilation in the team. The data is inserted by the team itself",
    bodyText: "<div>The chart operates with 4 stages of agile assimilation for each practice in use:<ul><li><em>Adoption</em>, the decision to adopt a practice has been made;</li><li><em>Adaptation</em>, the practice is being put to use, and team members are trained to use the practice;</li><li><em>Acceptance</em>, the team members are commited to using the innovation;</li><li><em>Routinisation</em>, usage of the practice is now encouraged as a normal activity, and is no longer defined as something out of the ordinary.</li></ul></div>"
  }
}


export { scrumPractices, xpPractices };
