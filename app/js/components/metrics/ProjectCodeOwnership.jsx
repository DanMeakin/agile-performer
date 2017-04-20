import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';
import MetricDescription from '../metrics/helpers/MetricDescription'

class ProjectCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.chartData} title="Project Code Ownership">
        <MetricDescription leadText={this.props.description.leadText} breadText={this.props.description.breadText} />
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.project.chart,
    description: state.metrics.codeOwnership.project.description
  }
}

export default connect(
  mapStateToProps
)(ProjectCodeOwnershipMetric);
