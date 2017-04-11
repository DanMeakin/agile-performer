import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadarChart from '../charts/RadarChart';

class TeamSkillsMetric extends Component {
  render() {
    return (
      <RadarChart data={this.props.chartData} title="Lines of Code" />
    )
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.metrics.teamSkills
  }
}

export default connect(
  mapStateToProps
)(TeamSkillsMetric);