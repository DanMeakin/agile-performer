import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../charts/MultiBarChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class SprintBurndownBarMetric extends Component {
    render() {
        return (
          <MultiBarChart data={this.props.chartData} title="Sprint Burndown">
            <MetricDescription description={this.props.description} />
          </MultiBarChart>
        )
    }
}
function mapStateToProps(state) {
    return {
      chartData: state.metrics.sprintBurndown.chart,
      description: state.metrics.sprintBurndown.description
    }
}

export default connect(
    mapStateToProps
)(SprintBurndownBarMetric);
