import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class HappinessIndexMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Happiness Index" />
    )
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.metrics.happinessIndex
  }
}

export default connect(
  mapStateToProps
)(HappinessIndexMetric);
