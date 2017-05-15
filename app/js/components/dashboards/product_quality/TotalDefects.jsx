import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilledLineChart from '../../charts/FilledLineChart';

class DefectsOverTime extends Component {
  render() {
    return (
      <FilledLineChart data={this.props.chartData} options={this.props.options} title="Current Defects" />
    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    options = {
      scales: {
        yAxes: [{
          stepped: true,
          stacked: true
        }]
      }
    };
  return {
    chartData: state.metrics.release.defectsOverTime(),
    options
  };
};

export default connect(
  mapStateToProps
)(DefectsOverTime);
