import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../../charts/LineChart';

class DefectsOverTime extends Component {
  render() {
    return (
      <LineChart data={this.props.chartData} options={this.props.options} title="Current Defects" />
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
    chartData: state.metrics.teams.selectTeam(currentTeam).defectsOverTimeData(),
    options
  };
};

export default connect(
  mapStateToProps
)(DefectsOverTime);
