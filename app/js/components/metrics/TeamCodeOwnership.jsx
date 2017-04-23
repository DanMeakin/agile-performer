import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';
import MetricDescription from '../metrics/helpers/MetricDescription';
import RGB from '../../lib/rgb';

const colours = [
  new RGB(92, 153, 237),  // blue
  new RGB(219, 70, 70),   // red
  new RGB(244, 214, 33), // yellow
  new RGB(180, 180, 180),  // gray
];

class TeamCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.chartData} colours={colours} title="Team Code Ownership" >
        <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.team.chart,
    description: state.metrics.codeOwnership.team.description
  }
}

export default connect(
  mapStateToProps
)(TeamCodeOwnershipMetric);
