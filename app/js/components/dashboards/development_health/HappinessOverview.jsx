import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';
import Overview from './overview';

class HappinessOverview extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Average Happiness" />
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
    overview = new Overview(state.metrics.teams.allTeams),
    chartData = [{
      description: "Happiness",
      data: overview.averageHappiness()
    }]
  console.log("Data", chartData);
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(HappinessOverview);
