import {
  scrumPractices,
  xpPractices
} from 'js/mocked_data/old_mocked_data/practices';
import {
  linesOfCode,
  codeCoverage
} from 'js/mocked_data/old_mocked_data/test';
import {
  storyPointEffort,
  velocity,
  detailedVelocity,
  remedialFocus,
  velocityBar,
  velocityLine
} from 'js/mocked_data/old_mocked_data/velocity';
import {
  teamSatisfaction
} from 'js/mocked_data/old_mocked_data/team_satisfaction';
import {
  sprintBurndown
} from 'js/mocked_data/old_mocked_data/sprint_burndown';
import {
  releaseBurndown
} from 'js/mocked_data/old_mocked_data/release_burndown';
import {
  happinessIndex
} from 'js/mocked_data/old_mocked_data/happiness_index';
import {
  averageLeadTime
} from 'js/mocked_data/old_mocked_data/lead_time';
import {
  commitmentLevel
} from 'js/mocked_data/old_mocked_data/commitment';
import {
  customerSatisfaction
} from 'js/mocked_data/old_mocked_data/customer_satisfaction';
import {
  sprintCadence
} from 'js/mocked_data/old_mocked_data/sprint_cadence';
import {
  projectCodeOwnership,
  teamCodeOwnership
} from 'js/mocked_data/old_mocked_data/code_ownership';
import {
  numberOfTestCases
} from 'js/mocked_data/old_mocked_data/test_cases';
import {
  sprintInterference
} from 'js/mocked_data/old_mocked_data/sprint_interference';
import {
  defectsOverTime
} from 'js/mocked_data/old_mocked_data/defects_over_time';
import {
  userStories
} from '../mocked_data/dashboard/user_stories';

import {
  release
} from '../mocked_data/dashboard/release';
import {
  teams
} from '../mocked_data/dashboard/teams';

const initialState = {
  currentMetric: null,
  currentTeam: null,
  // New data
  release,
  teams,
  options: {},
  // Probably temporary
  scrumPractices,
  xpPractices,
  linesOfCode,
  codeCoverage,
  velocity,
  detailedVelocity,
  remedialFocus,
  velocityBar,
  velocityLine,
  teamSatisfaction,
  sprintBurndown,
  releaseBurndown,
  happinessIndex,
  averageLeadTime,
  storyPointEffort,
  commitmentLevel,
  customerSatisfaction,
  sprintCadence,
  numberOfTestCases,
  codeOwnership: {
    project: projectCodeOwnership,
    team: teamCodeOwnership
  },
  sprintInterference,
  defectsOverTime
};

console.log("Initial state", initialState);

const metricsReducer = (state = initialState, action) => {
  let opts = state.options,
      newOpts = opts;
  switch (action.type) {
    case "SELECT_METRIC":
      return Object.assign({}, state, {
        currentMetric: action.metric
      });
    case "SELECT_TEAM":
      return Object.assign({}, state, {
        currentTeam: action.teamName
      });
    case "SELECT_SPRINT":
      newOpts = Object.assign({}, opts, {
        focusedSprint: action.sprint
      });
      return Object.assign({}, state, {
        options: newOpts
      });
    case "BURNUP_BREAKDOWN_BY_TEAMS":
        newOpts = Object.assign({}, opts, {
          burnupTeamBreakdown: !opts.burnupTeamBreakdown
        });
      return Object.assign({}, state, {
        options: newOpts
      });
    default:
      return state;
  }
};

export default metricsReducer;
