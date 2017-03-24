const selectView = (viewName) => {
    return {
        type: "SELECT_VIEW",
        view: viewName
    }
}

const selectMetric = (metricName) => {
    return {
        type: "SELECT_METRIC",
        metric: metricName
    }
}

export { selectView, selectMetric };
