import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class TeamCodeOwnershipMetric extends Component {
  render() {
    console.log("Props", this.props);
    return (
      <PieChart data={this.props.chartData} title="Team Code Ownership" >
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
