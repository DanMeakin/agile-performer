import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadarChart from '../charts/RadarChart';

class XpPracticesMetric extends Component {
  render() {
    return (
      <RadarChart data={this.props.chartData} title="XP Practices" />
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
