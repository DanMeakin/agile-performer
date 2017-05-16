import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../../charts/BarLineChart';

class PracticesTrend extends Component {
  render() {
    return (
      <BarLineChart data={this.props.chartData} options={this.props.options} title="Burndown Trend" />
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