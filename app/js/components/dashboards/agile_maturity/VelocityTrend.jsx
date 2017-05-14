import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class VelocityTrend extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Velocity Trend" />
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
            max: state.metrics.release.maximumPoints(),
            beginAtZero: true
          }
        }]
      }
    };
  return {
    chartData: state.metrics.release.velocityTrendData(currentTeam),
    options
  };
};

export default connect(
  mapStateToProps
)(VelocityTrend);
