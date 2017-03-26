import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from './charts/LineChart';

class LinesOfCodeMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Lines of Code" />
    )
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.metrics.linesOfCode
  }
}

export default connect(
  mapStateToProps
)(LinesOfCodeMetric);
