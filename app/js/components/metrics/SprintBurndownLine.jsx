import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class SprintBurndownLineMetric extends Component {
  chartData() {
    return this.props.chartData.map(dataPoint => (
      Object.assign({}, dataPoint, {
        description: dataPoint.description,
        data: dataPoint.data
      })
    ));
  }

  render() {
      return (
          <LineChart data={this.chartData()} title="Sprint Burndown">
            <MetricDescription description={this.props.description} />
          </LineChart>
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
)(SprintBurndownLineMetric);
