import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class SprintBurndownTrend extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Burndown Trend" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    sprints = state.metrics.release.burndownData(currentTeam),
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
    chartData = sprints;
    console.log("Sprints data", sprints);
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(SprintBurndownTrend);
