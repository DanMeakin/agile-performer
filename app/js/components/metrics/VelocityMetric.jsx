import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';

class VelocityMetric extends Component {
  render() {
    console.log("Where is my metrics?", this.props)
    return (
        <BarLineChart data={this.props.chartData} title="Velocity"></BarLineChart>
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.velocity
  }
}

export default connect(
  mapStateToProps
)(VelocityMetric);
