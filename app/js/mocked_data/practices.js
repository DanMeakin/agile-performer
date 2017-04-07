const ADOPTION = 1,
      ADAPTATION = 2,
      ACCEPTANCE = 3,
      ROUTINISATION = 4;

const scrumPractices = [
  { description: "Team α",
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
//  { description: "Team β",
//    data: {
//      "Daily scrum": ACCEPTANCE,
//      "Definition of \"Done\"": ACCEPTANCE
//    }
//  }
];

const xpPractices = [
  { description: "Team α",
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
];

export { scrumPractices, xpPractices };
