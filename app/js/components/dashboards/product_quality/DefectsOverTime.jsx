import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class DefectsOverTime extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Practices" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 5,
            beginAtZero: true
          }
        }]
      }
    };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).defectsOverTimeData(),
    options
  };
};

export default connect(
  mapStateToProps
)(DefectsOverTime);