import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class HappinessOverview extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Happiness" />
    )
  }
}

function mapStateToProps(state) {
  let options = {
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
  },
    chartData = [].concat.apply(
      [],
      state.metrics.teams.allTeams.map(team => {
        let data = team.happinessData()
        data[0].description = "Team " + team.name;
        return data;
      })
    );
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(HappinessOverview);
