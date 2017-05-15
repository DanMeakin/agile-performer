import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class StatusIndicator extends Component {
  statusClass() {
    let indicatorState,
      indicatorTrend;
    switch(this.props.colour) {
      case "GREEN":
        indicatorState = "status-good";
        break;
      case "YELLOW":
        indicatorState = "status-neutral";
        break;
      case "RED":
        indicatorState = "status-bad";
        break;
    }
    switch(this.props.trend) {
      case "INCREASING":
        indicatorTrend = "status-increasing";
        break;
      case "STEADY":
        indicatorTrend = "status-steady";
        break;
      case "DECREASING":
        indicatorTrend = "status-decreasing";
        break;
      default:
        indicatorTrend = "";
        break;
    }
    return ["status-indicator", indicatorState, indicatorTrend].join(" ");
  }

  render() {
    return (
      <div className={this.statusClass()} />
    );
  }
}
