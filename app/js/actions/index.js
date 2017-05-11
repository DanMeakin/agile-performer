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

export { selectView, selectMetric, filterMetrics, selectTeam };
