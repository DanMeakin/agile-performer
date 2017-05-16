import { Practices, maturity } from '../../model';

// -------------------------------------------------------------------------- //
// Practice Assessments //

const ADOPTION = maturity.adoption,
  ADAPTATION = maturity.adaptation,
  ACCEPTANCE = maturity.acceptance,
  ROUTINISATION = maturity.routinisation,
  INFUSION = maturity.infusion;

// Add practice assessments to each team.
let practiceAssessments = {
  alpha: [
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ROUTINISATION,
        "Definition of \"Done\"": ADOPTION,
        "Planning poker": ACCEPTANCE,
        "Scrum of Scrums": ADAPTATION,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ACCEPTANCE
      }, {
        "Pair Programming": ROUTINISATION,
        "Refactoring": ACCEPTANCE,
        "Simple Design": ADOPTION,
        "Small Releases": ACCEPTANCE,
        "Collective Ownership": ADAPTATION,
        "40-hour Week": ACCEPTANCE,
        "Test-driven Development": ADAPTATION
      }, {},
      new Date("2017-01-10")
    ),
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": INFUSION,
        "Definition of \"Done\"": ADAPTATION,
        "Planning poker": ACCEPTANCE,
        "Scrum of Scrums": ADAPTATION,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ACCEPTANCE
      }, {
        "Pair Programming": ROUTINISATION,
        "Refactoring": ROUTINISATION,
        "Simple Design": ADAPTATION,
        "Small Releases": ACCEPTANCE,
        "Collective Ownership": ADAPTATION,
        "40-hour Week": ACCEPTANCE,
        "Test-driven Development": ADAPTATION
      }, {},
      new Date("2017-03-14")
    ),
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": INFUSION,
        "Definition of \"Done\"": ACCEPTANCE,
        "Planning poker": ACCEPTANCE,
        "Scrum of Scrums": ADAPTATION,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ROUTINISATION
      }, {
        "Pair Programming": ROUTINISATION,
        "Refactoring": ROUTINISATION,
        "Simple Design": ADAPTATION,
        "Small Releases": ACCEPTANCE,
        "Collective Ownership": ADAPTATION,
        "40-hour Week": ACCEPTANCE,
        "Test-driven Development": ADAPTATION
      }, {},
      new Date("2017-05-12")
    )
  ],
  beta: [
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ACCEPTANCE,
        "Definition of \"Done\"": ACCEPTANCE,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ADOPTION
      }, {
        "Refactoring": ADOPTION,
        "Pair Programming": ADOPTION
      }, {
        "Kanban board": ADAPTATION
      },
      new Date("2017-01-25")
    ),
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ACCEPTANCE,
        "Definition of \"Done\"": ACCEPTANCE,
        "Sprint review": ACCEPTANCE,
        "Sprint retrospective": ADOPTION
      }, {
        "Refactoring": ADOPTION,
        "Pair Programming": ADOPTION
      }, {
        "Kanban board": ROUTINISATION,
        "Up-front design": ACCEPTANCE
      },
      new Date("2017-04-06")
    )
  ],
  epsilon: [
    new Practices({
        "Burndown chart": ADAPTATION,
        "Daily scrum": ACCEPTANCE,
        "Definition of \"Done\"": ACCEPTANCE,
        "Sprint review": ROUTINISATION,
        "Sprint retrospective": ADOPTION,
        "Scrum of Scrums": ACCEPTANCE
      }, {
        "Refactoring": ADOPTION,
        "Pair Programming": ADOPTION,
        "Collective Ownership": ADAPTATION,
        "40-hour Week": ACCEPTANCE
      }, {},
      new Date("2017-02-02")
    ),
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ACCEPTANCE,
        "Definition of \"Done\"": ROUTINISATION,
        "Sprint review": INFUSION,
        "Sprint retrospective": ROUTINISATION,
        "Scrum of Scrums": ACCEPTANCE
      }, {
        "Refactoring": ADAPTATION,
        "Pair Programming": ADAPTATION,
        "Collective Ownership": ROUTINISATION,
        "40-hour Week": ACCEPTANCE
      }, {},
      new Date("2017-04-10")
    )
  ],
  lambda: [
    new Practices({
        "Burndown chart": ROUTINISATION,
        "Daily scrum": ROUTINISATION,
        "Definition of \"Done\"": ACCEPTANCE,
        "Sprint review": INFUSION,
        "Sprint retrospective": INFUSION
      }, {
        "Pair Programming": ROUTINISATION,
        "Refactoring": INFUSION,
        "Simple Design": ROUTINISATION,
        "40-hour Week": ROUTINISATION,
        "Test-driven Development": INFUSION
      }, {
        "Mob Programming": ADAPTATION
      },
      new Date("2017-02-01")
    ),
    new Practices({
        "Burndown chart": INFUSION,
        "Daily scrum": INFUSION,
        "Definition of \"Done\"": ROUTINISATION,
        "Sprint review": INFUSION,
        "Sprint retrospective": INFUSION
      }, {
        "Pair Programming": INFUSION,
        "Refactoring": INFUSION,
        "Simple Design": INFUSION,
        "40-hour Week": ROUTINISATION,
        "Test-driven Development": INFUSION
      }, {
        "Mob Programming": ACCEPTANCE
      },
      new Date("2017-05-10")
    )
  ],
  theta: [
    new Practices({
        "Burndown chart": ADOPTION,
        "Daily scrum": ADOPTION,
        "Sprint review": ADOPTION,
        "Sprint retrospective": ADOPTION
      }, {
        "40-hour Week": ADOPTION,
        "Test-driven Development": ADOPTION
      }, {},
      new Date("2017-02-13")
    ),
    new Practices({
        "Burndown chart": ADAPTATION,
        "Daily scrum": ADAPTATION,
        "Sprint review": ADOPTION,
        "Sprint retrospective": ADAPTATION
      }, {
        "40-hour Week": ADAPTATION,
        "Test-driven Development": ADOPTION
      }, {},
      new Date("2017-04-12")
    )
  ],
  tau: [] // Don't do any for this team
};

export default practiceAssessments;
