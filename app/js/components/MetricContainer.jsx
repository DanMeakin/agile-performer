import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeCoverageMetric from './metrics/CodeCoverageMetric';
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
import SprintCadenceMetric from './metrics/SprintCadenceMetric';
import ProjectCodeOwnershipMetric from './metrics/ProjectCodeOwnership';
import TeamCodeOwnershipMetric from './metrics/TeamCodeOwnership';
import TestCasesMetric from './metrics/TestCases';
import RemedialFocusMetric from './metrics/RemedialFocus';
import SprintInterferenceMetric from './metrics/SprintInterference';
import DefectsOverTimeMetric from './metrics/DefectsOverTime';

/*
   Opinion on the best ten metrics:-

   Enhanced release burndown (it's pretty new, interesting)
   Velocity (traditional, but needed; maybe rework as line chart with clearer variances?)
   Sprint Burndown (traditional, but needed, though should be line chart)
   Code Ownership - both in same vis (it's pretty new too, and interesting)
   Scrum / XP Practices - both in same vis (it's pretty interesting tho maybe difficult)
   Sprint Interference
   Remedial Focus
   Team Satisfaction (useful, different perspective, important as it's about people)
   Happiness index (not too sure how different from the above?)
   Defects over time (least favourite of the 10, but probably useful)

   ---

   Agreed upon metrics:

   Code Ownership - A - CM
   Practices (both) - M - Retro
   Defects over time - A - Jira
   Remedial Focus - A - Jira (?)
   Enh. Rel. Burndown - M/A - Jira (?)
   Sprint Burndown - A - Jira
   Happiness index - M - Weekly
   Satisfaction - M - Retro
   Velocity A/B - A - Jira
   Sprint Interference - M - Retro

 */

const metricComponents = {
  "CODE_COVERAGE": (<CodeCoverageMetric />),
  "TEAM_SATISFACTION": (<TeamSatisfactionMetric />),
  "HAPPINESS_INDEX": (<HappinessIndexMetric />),
  "VELOCITY": (<VelocityMetric />),
  "VELOCITY_TREND": (<VelocityTrendMetric />),
  "SPRINT_BURNDOWN": (<SprintBurndownMetric />),
  "ENHANCED_RELEASE_BURNDOWN": (<EnhancedReleaseBurndownMetric />),
  "SCRUM_PRACTICES": (<ScrumPracticesMetric />),
  "XP_PRACTICES": (<XpPracticesMetric />),
  "LEAD_TIME": (<LeadTimeMetric />),
  "SPRINT_CADENCE": (<SprintCadenceMetric />),
  "CODE_OWNERSHIP_PROJECT": (<ProjectCodeOwnershipMetric />),
  "CODE_OWNERSHIP_TEAM": (<TeamCodeOwnershipMetric />),
  "REMEDIAL_FOCUS": (<RemedialFocusMetric />),
  "TEST_CASES_COUNT": (<TestCasesMetric />),
  "SPRINT_INTERFERENCE": (<SprintInterferenceMetric />),
  "DEFECTS_OVER_TIME": (<DefectsOverTimeMetric />)
}

class MetricContainer extends Component {
  render() {
    if (!this.props.currentMetric) {
      return (<div>Please select a menuitem! :)</div>)
    } else {
      return (this.renderMetric(this.props.currentMetric))
    }
  }

  renderMetric(currentMetric) {
    return (
      <div>
        {metricComponents[currentMetric]}
      </div>
    )
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
