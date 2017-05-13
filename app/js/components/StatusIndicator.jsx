import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class StatusIndicator extends Component {
  statusClass() {
    let indicatorState;
    switch(this.props.value) {
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
    return "status-indicator " + indicatorState;
  }

  render() {
    return (
      <div className={this.statusClass()} />
    );
  }
}
