import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

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
        <LineChart data={this.chartData()} title="Velocity">
          <MetricDescription description={this.props.description} />
        </LineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocityLine.chart,
    description: state.metrics.velocityLine.description
  }
}



export default connect(
  mapStateToProps
)(VelocityLineMetric);
