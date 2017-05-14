import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';
import SprintSelector from '../../SprintSelector';

class SprintBurndown extends Component {
  render() {
    return (
      <div>
        <LineChart data={this.props.chartData} options={this.props.options}>
          <div className="row">
            <div className="small-6 columns">
              <h3>Sprint Burndown</h3>
            </div>
            <div className="small-6 columns">
              <SprintSelector />
            </div>
          </div>
        </LineChart>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
      currentSprint = state.metrics.options.focusedSprint || 1,
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
    chartData = sprints.length == 0 ? [] : sprints[currentSprint - 1].burndownData();
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(SprintBurndown);
