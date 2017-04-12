import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';

class TeamCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.chartData} title="Team Code Ownership">
        <p className="lead">
          Team Code Ownership measures the per-module contribution to the
          codebase by members of one Scrum team.
        </p>
        <p>
          A team member can be either a <em>Major</em> or
          a <em>Minor</em> contributor to a module within the codebase
          (or it may not be a contributor to that module at all).
          A <em>Major</em> contributor
          is a team which has made 5% or more of all commits to that module;
          a <em>Minor</em> contributor is a team making less than 5% of all
          commits.
        </p>
        <p>
          This chart illustrates the proportion of the codebase contributed
          to by this Scrum team, and the nature of that contribution: whether
          by only one team member, or by multiple members.
        </p>
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.team
  }
}

export default connect(
  mapStateToProps
)(TeamCodeOwnershipMetric);
