import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../../charts/MultiBarChart';

class Satisfaction extends Component {
  render() {
    return (
      <MultiBarChart data={this.props.chartData} options={this.props.options} title="Satisfaction" />
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
    chartData: state.metrics.teams.selectTeam(currentTeam).satisfactionData(),
    options
  };
};

export default connect(
  mapStateToProps
)(Satisfaction);
