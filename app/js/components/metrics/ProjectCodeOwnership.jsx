import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PieChart from '../charts/PieChart';

class ProjectCodeOwnershipMetric extends Component {
  render() {
    return (
      <PieChart data={this.props.chartData} title="Project Code Ownership">
        <p className="lead">
          Project Code Ownership measures the per-module contribution
          to the codebase by different Scrum teams within the project.
        </p>
        <p>
          A team can be either a <em>Major</em> or
          a <em>Minor</em> contributor to a module within the codebase
          (or it may not be a contributor to that module at all).
          A <em>Major</em> contributor
          is a team which has made 5% or more of all commits to that module;
          a <em>Minor</em> contributor is a team making less than 5% of all
          commits.
        </p>
      </PieChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.codeOwnership.project
  }
}

export default connect(
  mapStateToProps
)(ProjectCodeOwnershipMetric);
