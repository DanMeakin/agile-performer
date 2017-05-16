import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../../charts/BarLineChart';

class PracticesTrend extends Component {
  render() {
    return (
      <BarLineChart data={this.props.chartData} options={this.props.options} title="Team Maturity" />
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
    chartData = state.metrics.release.practicesTrendData();
  return {
    chartData,
    options
  };
};

export default connect(
  mapStateToProps
)(PracticesTrend);