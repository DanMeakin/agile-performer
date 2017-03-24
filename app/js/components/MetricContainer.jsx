import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeCoverageMetric from './CodeCoverageMetric'
import LinesOfCodeMetric from './LinesOfCodeMetric'

const metricComponents = {
  "CODE_COVERAGE": (<CodeCoverageMetric />),
  "LINES_OF_CODE": (<LinesOfCodeMetric />),
//  "SCRUM_PRACTICES": (<ScrumPracticesMetric />),
//  "XP_PRACTICES": (<XpPracticesMetric />)
}

class MetricContainer extends Component {
  render() {
    return metricComponents[this.props.currentMetric] || (<div>Nothing here!</div>)
  }
}

function mapStateToProps(state) {
  return {
    currentMetric: state.metrics.currentMetric
  }
}

export default connect(
  mapStateToProps
)(MetricContainer);
