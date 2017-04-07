import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeCoverageMetric from './metrics/CodeCoverageMetric';
import LinesOfCodeMetric from './metrics/LinesOfCodeMetric';
import TeamSatisfactionMetric from './metrics/TeamSatisfactionMetric';
import VelocityMetric from './metrics/VelocityMetric';
import HappinessIndexMetric from './metrics/HappinessIndexMetric';
import ScrumPracticesMetric from './metrics/ScrumPracticesMetric';
import XpPracticesMetric from './metrics/XpPracticesMetric';

const metricComponents = {
  "CODE_COVERAGE": (<CodeCoverageMetric />),
  "LINES_OF_CODE": (<LinesOfCodeMetric />),
  "TEAM_SATISFACTION": (<TeamSatisfactionMetric/>),
  "VELOCITY": (<VelocityMetric/>),
  "HAPPINESS_INDEX": (<HappinessIndexMetric/>),
  "SCRUM_PRACTICES": (<ScrumPracticesMetric />),
  "XP_PRACTICES": (<XpPracticesMetric />)
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
