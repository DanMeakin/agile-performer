import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from './dashboards';
import { selectMetric } from '../actions';

class LandingPanel extends Component {
  render() {
    let dashboard = this.props.dashboard,
      statusClass = this.props.status ? "status-" + this.props.status.toLowerCase() : "",
      panelClass = "landing-panel medium-3 columns";
    return (
      <div className={panelClass}>
        <div className={statusClass + " inner-panel"}>
          <h3>{this.props.title}</h3>
          {this.props.children}
          <div className="view-link">
            <a href="#" onClick={() => this.props.selectMetric(dashboard)}>
              View
            </a>
          </div>
        </div>
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
