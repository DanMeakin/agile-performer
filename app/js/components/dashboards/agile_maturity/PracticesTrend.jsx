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
  let displayTicks = value => {
      let adoptionLabels = {
        1: "Adoption",
        2: "Adaptation",
        3: "Acceptance",
        4: "Routinisation",
        5: "Infusion"
      };
      return adoptionLabels[value] || "";
    },
  options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            callback: displayTicks,
            min: 0,
            max: 5,
            stepSize: 1,
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
