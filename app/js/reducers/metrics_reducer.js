import { release, teams } from '../mocked_data';
import { Dashboard } from '../components/dashboards';

const initialState = {
  currentMetric: Dashboard,
  currentTeam: null,
  // New data
  release,
  teams,
  options: {}
};

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
    case "SELECT_TEAM_DASHBOARD":
      return Object.assign({}, state, {
        currentTeam: action.teamName,
        currentMetric: action.dashboard
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
    case "PRACTICES_BY_PRACTICE":
    console.log("PRACTICES BY PRACTICE", opts);
      newOpts = Object.assign({}, opts, {
        practicesByPractice: !opts.practicesByPractice
      });
      return Object.assign({}, state, {
        options: newOpts
      });
    default:
      return state;
  }
};

export default metricsReducer;
