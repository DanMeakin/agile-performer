import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class CustomerSatisfactionMetric extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} title="Code Coverage" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.customerSatisfaction
  }
}

export default connect(
  mapStateToProps
)(CustomerSatisfactionMetric);
