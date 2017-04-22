import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

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
          <LineChart data={this.chartData()} title="Sprint Burndown" />
      )
  }
}
function mapStateToProps(state) {
    return {
        chartData: state.metrics.sprintBurndown
    }
}

export default connect(
    mapStateToProps
)(SprintBurndownLineMetric);
