import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MetricContainer extends Component {
  render() {
    return React.createElement(
      this.props.currentMetric || "div",
      {},
      null
      ) || "Please select a menu item."
  }
}

function mapStateToProps(state) {
  return {
    currentMetric: state.metrics.currentMetric
  }
}

export default connect(
  mapStateToProps
)(MetricContainer);
