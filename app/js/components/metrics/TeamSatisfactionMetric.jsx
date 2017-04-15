import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';

class TeamSatisfactionMetric extends Component {
  render() {
    return (
        <BarLineChart data={this.props.chartData} title="Team Satisfaction"></BarLineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.teamSatisfaction
  }
}

export default connect(
  mapStateToProps
)(TeamSatisfactionMetric);
