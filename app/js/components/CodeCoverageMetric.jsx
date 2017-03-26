import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PercentageLineChart from './charts/PercentageLineChart';

class CodeCoverageMetric extends Component {
  render() {
    return (
      <PercentageLineChart data={this.props.chartData} title="Code Coverage" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeCoverage
  }
}

export default connect(
  mapStateToProps
)(CodeCoverageMetric);
