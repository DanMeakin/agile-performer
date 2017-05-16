const selectView = (viewName) => {
  return {
    type: "SELECT_VIEW",
    view: viewName
  };
};

const selectMetric = (metricName) => {
  return {
    type: "SELECT_METRIC",
    metric: metricName
  };
};

const selectTeamDashboard = (teamName, dashboard) => {
  return {
    type: "SELECT_TEAM_DASHBOARD",
    teamName,
    dashboard
  };
};

const filterMetrics = (term) => {
  return {
    type: "FILTER_METRICS",
    term
  };
};

const selectTeam = (teamName) => {
  return {
    type: "SELECT_TEAM",
    teamName
  };
};

const burnupBreakdownByTeams = () => {
  return {
    type: "BURNUP_BREAKDOWN_BY_TEAMS"
  };
};

const togglePracticesByPractice = () => {
  return {
    type: "PRACTICES_BY_PRACTICE"
  };
};

const selectSprint = (sprintNumber) => {
  return {
    type: "SELECT_SPRINT",
    sprint: sprintNumber
  };
};

export {
  selectView,
  selectMetric,
  selectTeamDashboard,
  filterMetrics,
  selectTeam,
  burnupBreakdownByTeams,
  togglePracticesByPractice,
  selectSprint
};
