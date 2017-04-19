import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';

class TeamCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.metric} title="Team Code Ownership" >
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    metric: state.metrics.codeOwnership.team
  }
}

export default connect(
  mapStateToProps
)(TeamCodeOwnershipMetric);
