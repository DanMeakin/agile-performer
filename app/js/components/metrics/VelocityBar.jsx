import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class VelocityBarMetric extends Component {
  render() {
    return (
      <BarLineChart data={this.props.chartData} title="Velocity">
        <MetricDescription description={this.props.description} />
      </BarLineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocityBar.chart,
    description: state.metrics.velocityBar.description
  }
}

export default connect(
  mapStateToProps
)(VelocityBarMetric);
