import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UnsortedLineChart from '../charts/UnsortedLineChart';

class DefectsOverTimeMetric extends Component {
  render() {
    return (
      <UnsortedLineChart data={this.props.chartData} options={this.props.options} title="Defects Over Time" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.defectsOverTime
  };
};

export default connect(
  mapStateToProps
)(DefectsOverTimeMetric);
