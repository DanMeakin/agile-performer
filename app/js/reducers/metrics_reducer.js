import { scrumPractices, xpPractices } from 'js/mocked_data/practices';
import { teamSkills } from 'js/mocked_data/team_skills';
import { linesOfCode, testCoverage } from 'js/mocked_data/test';
import { storyPoints } from 'js/mocked_data/story_points';
import { happinessIndex } from 'js/mocked_data/happiness_index';
import { burndown } from 'js/mocked_data/burndown';

const initialState = {
  scrumPractices,
  xpPractices,
  teamSkills,
  linesOfCode,
  testCoverage,
  storyPoints,
  happinessIndex,
  burndown
};

const metricsReducer = (state = initialState, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

export default metricsReducer;
