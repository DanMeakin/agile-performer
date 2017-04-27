import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class HappinessIndexMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Happiness Index" >
        <MetricDescription description={this.props.description} />
      </LineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.happinessIndex.chart,
    description: state.metrics.happinessIndex.description
  }
}

export default connect(
  mapStateToProps
)(HappinessIndexMetric);
