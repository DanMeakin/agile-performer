import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class TeamSatisfactionMetric extends Component {
  render() {
    return (
        <BarLineChart data={this.props.chartData} title="Team Satisfaction">
          <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />
        </BarLineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.teamSatisfaction.chart,
    description: state.metrics.teamSatisfaction.description
  }
}

export default connect(
  mapStateToProps
)(TeamSatisfactionMetric);
