import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeCoverageMetric from './metrics/CodeCoverageMetric';
import LinesOfCodeMetric from './metrics/LinesOfCodeMetric';
import TeamSatisfactionMetric from './metrics/TeamSatisfactionMetric';
import VelocityMetric from './metrics/VelocityMetric';
import VelocityTrendMetric from './metrics/VelocityTrend';
import HappinessIndexMetric from './metrics/HappinessIndexMetric';
import EnhancedReleaseBurndownMetric from './metrics/EnhancedReleaseBurndown';
import SprintBurndownMetric from './metrics/SprintBurndownMetric';
import ScrumPracticesMetric from './metrics/ScrumPracticesMetric';
import XpPracticesMetric from './metrics/XpPracticesMetric';
import TeamSkillsMetric from './metrics/TeamSkillsMetric';
import LeadTimeMetric from './metrics/LeadTimeMetric';
import ProjectCodeOwnershipMetric from './metrics/ProjectCodeOwnership';
import TeamCodeOwnershipMetric from './metrics/TeamCodeOwnership';
import TestCasesMetric from './metrics/TestCases';
import RemedialFocusMetric from './metrics/RemedialFocus';
import SprintInterferenceMetric from './metrics/SprintInterference';
import DefectsOverTimeMetric from './metrics/DefectsOverTime';

const metricComponents = {
  "CODE_COVERAGE": (<CodeCoverageMetric />),
  "LINES_OF_CODE": (<LinesOfCodeMetric />),
  "TEAM_SATISFACTION": (<TeamSatisfactionMetric />),
  "HAPPINESS_INDEX": (<HappinessIndexMetric />),
  "VELOCITY": (<VelocityMetric />),
  "VELOCITY_TREND": (<VelocityTrendMetric />),
  "SPRINT_BURNDOWN": (<SprintBurndownMetric />),
  "ENHANCED_RELEASE_BURNDOWN": (<EnhancedReleaseBurndownMetric />),
  "SCRUM_PRACTICES": (<ScrumPracticesMetric />),
  "XP_PRACTICES": (<XpPracticesMetric />),
  "TEAM_SKILLS": (<TeamSkillsMetric />),
  "LEAD_TIME": (<LeadTimeMetric />),
  "CODE_OWNERSHIP_PROJECT": (<ProjectCodeOwnershipMetric />),
  "CODE_OWNERSHIP_TEAM": (<TeamCodeOwnershipMetric />),
  "REMEDIAL_FOCUS": (<RemedialFocusMetric />),
  "TEST_CASES_COUNT": (<TestCasesMetric />),
  "SPRINT_INTERFERENCE": (<SprintInterferenceMetric />),
  "DEFECTS_OVER_TIME": (<DefectsOverTimeMetric />)
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
