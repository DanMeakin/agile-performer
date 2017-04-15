import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeCoverageMetric from './metrics/CodeCoverageMetric';
import LinesOfCodeMetric from './metrics/LinesOfCodeMetric';
import TeamSatisfactionMetric from './metrics/TeamSatisfactionMetric';
import VelocityMetric from './metrics/VelocityMetric';
import HappinessIndexMetric from './metrics/HappinessIndexMetric';
import SprintBurndownMetric from './metrics/SprintBurndownMetric';
import ScrumPracticesMetric from './metrics/ScrumPracticesMetric';
import XpPracticesMetric from './metrics/XpPracticesMetric';
import TeamSkillsMetric from './metrics/TeamSkillsMetric';
import LeadTimeMetric from './metrics/LeadTimeMetric';
import StoryPointEffortMetric from './metrics/StoryPointEffortMetric';
import CommitmentLevelMetric from './metrics/CommitmentLevelMetric';
import CustomerSatisfactionMetric from './metrics/CustomerSatisfactionMetric';

const metricComponents = {
  "CODE_COVERAGE": (<CodeCoverageMetric />),
  "LINES_OF_CODE": (<LinesOfCodeMetric />),
  "TEAM_SATISFACTION": (<TeamSatisfactionMetric />),
  "HAPPINESS_INDEX": (<HappinessIndexMetric />),
  "VELOCITY": (<VelocityMetric />),
  "SPRINT_BURNDOWN": (<SprintBurndownMetric />),
  "SCRUM_PRACTICES": (<ScrumPracticesMetric />),
  "XP_PRACTICES": (<XpPracticesMetric />),
  "TEAM_SKILLS": (<TeamSkillsMetric />),
  "LEAD_TIME": (<LeadTimeMetric />),
  "STORY_POINT_EFFORT": (<StoryPointEffortMetric />),
  "COMMITMENT_LEVEL": (<CommitmentLevelMetric />),
  "CUSTOMER_SATISFACTION": (<CustomerSatisfactionMetric />),
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
