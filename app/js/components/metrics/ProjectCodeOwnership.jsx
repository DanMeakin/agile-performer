import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';

class ProjectCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.metric} title="Project Code Ownership">
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    metric: state.metrics.codeOwnership.project
  }
}

export default connect(
  mapStateToProps
)(ProjectCodeOwnershipMetric);
