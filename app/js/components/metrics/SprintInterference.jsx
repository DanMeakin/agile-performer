import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class SprintInterferenceMetric extends Component {
  chartOptions() {
    return {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Person-Days Spent on Non-Sprint Backlog Tasks"
          }
        }]
      }
    }
  }

  render() {
    return (
      <LineChart data={this.props.chartData} options={this.chartOptions()} title="Sprint Interference" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.sprintInterference
  }
}

export default connect(
  mapStateToProps
)(SprintInterferenceMetric);
