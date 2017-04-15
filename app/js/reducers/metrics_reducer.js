import { scrumPractices, xpPractices } from 'js/mocked_data/practices';
import { teamSkills } from 'js/mocked_data/team_skills';
import { linesOfCode, codeCoverage } from 'js/mocked_data/test';
import { storyPointEffort, velocity } from 'js/mocked_data/velocity';
import { teamSatisfaction } from 'js/mocked_data/team_satisfaction';
import { sprintBurndown } from 'js/mocked_data/sprint_burndown';
import { happinessIndex } from 'js/mocked_data/happiness_index';
import { averageLeadTime } from 'js/mocked_data/lead_time';
import { commitmentLevel } from 'js/mocked_data/commitment';
import { customerSatisfaction } from 'js/mocked_data/customer_satisfaction';
import { sprintCadence } from 'js/mocked_data/sprint_cadence';

const initialState = {
  currentMetric: null,
  // Probably temporary
  scrumPractices,
  xpPractices,
  teamSkills,
  linesOfCode,
  codeCoverage,
  velocity,
  teamSatisfaction,
  sprintBurndown,
  happinessIndex,
  averageLeadTime,
  storyPointEffort,
  commitmentLevel,
  customerSatisfaction,
  sprintCadence,
};

const metricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_METRIC":
      return Object.assign({}, state, {
        currentMetric: action.metric
      });
    default:
      return state;
  }
};

export default metricsReducer;
