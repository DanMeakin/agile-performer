import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../../charts/BarLineChart';

class Velocity extends Component {
  render() {
    return (
      <BarLineChart data={this.props.chartData} title="Velocity" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam || "θ";
  return {
    chartData: state.metrics.release.velocityData(currentTeam)
  };
};

export default connect(
  mapStateToProps
)(Velocity);
