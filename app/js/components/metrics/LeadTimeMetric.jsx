import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class LeadTimeMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Lead Time (In days)" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.averageLeadTime
  }
}

export default connect(
  mapStateToProps
)(LeadTimeMetric);
