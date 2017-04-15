import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class TestCasesMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Number of Test Cases" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.numberOfTestCases
  }
}

export default connect(
  mapStateToProps
)(TestCasesMetric);
