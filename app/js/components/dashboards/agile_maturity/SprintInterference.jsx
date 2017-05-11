import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PercentageLineChart from '../../charts/PercentageLineChart';

class SprintInterference extends Component {
  render() {
    return (
      <PercentageLineChart data={this.props.chartData} options={this.props.options} title="Practices" />
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