import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../../charts/BarLineChart';

class Velocity extends Component {
  render() {
    return (
      <BarLineChart data={this.props.chartData} options={this.props.options} title="Velocity" />
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
    chartData: state.metrics.release.velocityData(currentTeam),
    options
  };
};

export default connect(
  mapStateToProps
)(Velocity);
