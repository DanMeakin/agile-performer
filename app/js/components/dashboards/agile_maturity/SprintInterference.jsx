import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PercentageFilledLineChart from '../../charts/PercentageFilledLineChart';

class SprintInterference extends Component {
  render() {
    return (
      <PercentageFilledLineChart data={this.props.chartData} options={this.props.options} title="Sprint Interference" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    options = {
    };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).sprintInterferenceData(),
    options
  };
};

export default connect(
  mapStateToProps
)(SprintInterference);