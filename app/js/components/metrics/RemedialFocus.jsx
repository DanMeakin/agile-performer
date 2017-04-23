import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../charts/MultiBarChart';
import MetricDescription from './helpers/MetricDescription'

class RemedialFocusMetric extends Component {

  remedialChartOptions() {
    let opts = Object.assign({}, this.props.options, {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    });
    return opts;
  }

  render() {
    return (
      <MultiBarChart data={this.props.chartData} options={this.remedialChartOptions()} title="Remedial Focus" >
        <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />
      </MultiBarChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.remedialFocus.chart,
    description: state.metrics.remedialFocus.description
  };
};

export default connect(
  mapStateToProps
)(RemedialFocusMetric);
