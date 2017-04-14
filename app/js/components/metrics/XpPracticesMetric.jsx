import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadarChart from '../charts/RadarChart';

class XpPracticesMetric extends Component {
  chartOptions() {
    let displayTicks = value => {
      let adoptionLabels = {
        1: "Adoption",
        2: "Adaptation",
        3: "Acceptance",
        4: "Routinisation"
      };
      return adoptionLabels[value] || "";
    };
    return {
      scale: {
        ticks: {
          callback: displayTicks,
          min: 0,
          max: 5,
          stepSize: 1
        }
      }
    }
  }

  render() {
    return (
      <RadarChart data={this.props.chartData} options={this.chartOptions()} title="XP Practices" />
    )
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.metrics.xpPractices
  }
}

export default connect(
  mapStateToProps
)(XpPracticesMetric);
