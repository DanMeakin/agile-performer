import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class Happiness extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Happiness" />
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
    chartData: state.metrics.teams.selectTeam(currentTeam).happinessData(),
    options
  };
};

export default connect(
  mapStateToProps
)(Happiness);
