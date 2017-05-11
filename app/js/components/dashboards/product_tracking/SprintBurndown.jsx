import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class SprintBurndown extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Sprint Burndown" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    sprints = state.metrics.release.sprintsForTeam(currentTeam),
    options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: state.metrics.release.maximumPoints(),
            beginAtZero: true
          }
        }]
      }
    },
    chartData = sprints.length == 0 ? [] : sprints[sprints.length - 1].burndownData();
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(SprintBurndown);
