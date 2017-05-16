import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from './dashboards';
import { selectMetric } from '../actions';

class LandingPanel extends Component {
  render() {
    let dashboard = this.props.dashboard;
    return (
      <div className="landing-panel medium-6 columns">
        <h3>{this.props.title}</h3>
        {this.props.children}
        <a href="#" onClick={() => this.props.selectMetric(dashboard)}>
          View
        </a>
      </div>
    )
  }
}

export function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric
    },
    dispatch
  );
}

export default connect(
  null,
  matchDispatchToProps
)(LandingPanel)
