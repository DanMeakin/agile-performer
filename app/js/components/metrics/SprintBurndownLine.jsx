import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LineChart from '../charts/LineChart';

class SprintBurndownLineMetric extends Component {
  chartData() {
    return this.props.chartData.map(dataPoint => {
      console.log("Datapoint", dataPoint);
      let data = dataPoint.data,
        description = dataPoint.description;
      if (description == "Remaining Effort") {
        let dropWeek4 = dateKey => (
          !dateKey.includes("Week 4")
        );
        data = Object.keys(data).filter(dropWeek4).reduce((acc, k) => {
          acc[k] = data[k];
          return acc;
        }, {});
      }
      return Object.assign({}, dataPoint, {
        description,
        data
      });
    })
  }

  render() {
      return (
          <LineChart data={this.chartData()} title="Sprint Burndown" />
      )
  }
}
function mapStateToProps(state) {
    return {
        chartData: state.metrics.sprintBurndown
    }
}

export default connect(
    mapStateToProps
)(SprintBurndownLineMetric);
