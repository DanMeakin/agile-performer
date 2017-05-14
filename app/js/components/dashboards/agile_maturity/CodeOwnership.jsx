import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../../charts/PieChart';

class CodeOwnership extends Component {
  render() {
    return (
      <PieChart data={this.props.chartData} options={this.props.options} title="Code Ownership" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    options = {
    };
  return {
    chartData: state.metrics.teams.selectTeam(currentTeam).codeOwnershipData(),
    options
  };
};

export default connect(
  mapStateToProps
)(CodeOwnership);