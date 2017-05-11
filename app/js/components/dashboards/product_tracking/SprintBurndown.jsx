import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class SprintBurndown extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Sprint Burndown" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    sprints = state.metrics.release.sprintsForTeam(currentTeam);
  return {
    chartData: sprints[sprints.length - 1].burndownData()
  };
};

export default connect(
  mapStateToProps
)(SprintBurndown);
