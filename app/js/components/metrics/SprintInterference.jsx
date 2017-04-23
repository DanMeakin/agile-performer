import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';
import MetricDescription from './helpers/MetricDescription'

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
      <LineChart data={this.props.chartData} options={this.chartOptions()} title="Sprint Interference">
            <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />  
      </LineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.sprintInterference.chart,
    description: state.metrics.sprintInterference.description
  }
}

export default connect(
  mapStateToProps
)(SprintInterferenceMetric);
