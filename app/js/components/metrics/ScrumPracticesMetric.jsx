import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadarChart from '../charts/RadarChart';

class ScrumPracticesMetric extends Component {
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
      <RadarChart data={this.props.chartData} options={this.chartOptions()} title="Scrum Practices" />
    )
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.metrics.scrumPractices
  }
}

export default connect(
  mapStateToProps
)(ScrumPracticesMetric);
