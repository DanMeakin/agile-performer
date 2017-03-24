import { scrumPractices, xpPractices } from 'js/mocked_data/practices';
import { teamSkills } from 'js/mocked_data/team_skills';
import { linesOfCode, codeCoverage } from 'js/mocked_data/test';
import { storyPoints } from 'js/mocked_data/story_points';
import { happinessIndex } from 'js/mocked_data/happiness_index';
import { burndown } from 'js/mocked_data/burndown';

const initialState = {
  currentMetric: null,
  // Probably temporary
  scrumPractices,
  xpPractices,
  teamSkills,
  linesOfCode,
  codeCoverage,
  storyPoints,
  happinessIndex,
  burndown
};

const metricsReducer = (state = initialState, action) => {
  switch(action.type) {
  case "SELECT_METRIC":
    return Object.assign({}, state, {
      currentMetric: action.metric
    });
  default:
    return state;
  }
};

export default metricsReducer;
