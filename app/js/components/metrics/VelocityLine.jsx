import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class VelocityLineMetric extends Component {
  chartData() {
    return this.props.chartData.map(({ description, data }) => (
      {
        description,
        data,
        chartType: "line",
        borderDash: description == "Commitment" ? [10, 5] : undefined
      }
    ))
  }

  render() {
    return (
        <LineChart data={this.chartData()} title="Velocity" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocity
  }
}

export default connect(
  mapStateToProps
)(VelocityLineMetric);
