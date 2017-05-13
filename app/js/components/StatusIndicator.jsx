import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class StatusIndicator extends Component {
  statusIndication() {
    switch(this.props.value) {
      case "GREEN":
        return "OK";
      case "YELLOW":
        return "Meh";
      case "RED":
        return "BAD"
    }
  }

  render() {
    return (
      <div className="status-indicator">
        {this.statusIndication()}
      </div>
    );
  }
}
