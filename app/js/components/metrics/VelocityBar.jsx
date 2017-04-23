import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class VelocityBarMetric extends Component {
  render() {
    return (
        <BarLineChart data={this.props.chartData} title="Velocity">
          <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />
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
