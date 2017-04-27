import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UnsortedLineChart from '../charts/UnsortedLineChart';
import MetricDescription from './helpers/MetricDescription'

class DefectsOverTimeMetric extends Component {
  render() {
    return (
      <UnsortedLineChart data={this.props.chartData} options={this.props.options} title="Defects Over Time">
        <MetricDescription description={this.props.description} />
      </UnsortedLineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.defectsOverTime.chart,
    description: state.metrics.defectsOverTime.description
  };
};

export default connect(
  mapStateToProps
)(DefectsOverTimeMetric);
