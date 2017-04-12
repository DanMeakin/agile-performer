import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadarChart from '../charts/RadarChart';

class ScrumPracticesMetric extends Component {
  render() {
    return (
      <RadarChart data={this.props.chartData} title="Scrum Practices" />
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
