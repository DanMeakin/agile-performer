/**
 * @fileOverview Contains mocked team data for use within the dashboard
 * prototype. Six teams are mocked, together with their associated assessments,
 * time breakdowns and defects.
 *
 * The timescale for activities of these teams is taken to be from January 2017
 * and five sprints onwards. Each sprint is 2 weeks long, with a 1 week break
 * in between.
 *
 * Data is here: https://docs.google.com/spreadsheets/d/1uyrMFglZ--AyONmUNv0L8YmV_NMoBCPQMwvjMJam1iA/pubhtml
 */
import {
  addDays
} from '../../lib/dates';
import Team from '../../model/team';
import Happiness from '../../model/happiness';
import Satisfaction from '../../model/satisfaction';
import TimeBreakdown from '../../model/time_breakdown';

import defects from './teams/defects';
import practiceAssessments from './teams/practices';
import happinessAssessments from './teams/happiness';
import satisfactionAssessments from './teams/satisfaction';
import timeBreakdowns from './teams/time_breakdowns';

// -------------------------------------------------------------------------- //
// Create Teams //

let teams = {
  alpha: new Team("α"),
  beta: new Team("β"),
  epsilon: new Team("ε"),
  lambda: new Team("λ"),
  theta: new Team("θ"),
  tau: new Team("τ")
};

// Define starting dates for first sprints (not needed here, but needed
// elsewhere).
let startingDates = {
  alpha: new Date("2017-01-09"),
  beta: new Date("2017-01-16"),
  epsilon: new Date("2017-01-16"),
  lambda: new Date("2017-01-23"),
  theta: new Date("2017-01-30"),
  tau: new Date("2017-01-30")
};


// -------------------------------------------------------------------------- //
// Assign Assessments to Teams //

Object.keys(teams).forEach(teamName => {
  let calcFriday = weekNum => addDays(startingDates[teamName], 4 + weekNum * 7),
    calcRetro = sprintNum => addDays(startingDates[teamName], 16 + sprintNum * 21),
    happiness = happinessAssessments[teamName].map((happinessValue, idx) => (
      new Happiness(happinessValue, calcFriday(idx))
    )),
    satisfaction = satisfactionAssessments[teamName].map((satisfactionValue, idx) => (
      new Satisfaction(satisfactionValue, calcRetro(idx))
    )),
    timeBreakdown = timeBreakdowns[teamName].map((breakdownValue, idx) => (
      new TimeBreakdown(breakdownValue, calcRetro(idx))
    )),
      practices = practiceAssessments[teamName],
      teamDefects = defects[teamName];

  teams[teamName].happinessAssessments = happiness;
  teams[teamName].satisfactionAssessments = satisfaction;
  teams[teamName].timeBreakdowns = timeBreakdown;
  teams[teamName].practiceAssessments = practices;
  teams[teamName].defects = teamDefects;
});

export { startingDates, teams };
