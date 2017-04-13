import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PercentageLineChart from '../charts/PercentageLineChart';
import RGB from '../../lib/rgb';

class VelocityTrendMetric extends Component {
  colours() {
    return [
      new RGB(200, 200, 200),
      new RGB(100, 255, 0)
    ];
  }

  /**
   * Transform regular velocity data into trend data.
   *
   * Velocity trend data is data with a baseline of expected work, and a
   * variance from this which represents the percentage by which the estimated
   * work for the sprint was incorrect.
   */
  trendData() {
    let [commitment, completed] = ["Commitment", "Work Completed"].map(desc => {
      let val = this.props.chartData.find(entry => {
        return entry.description == desc;
      })
      console.log("Value", val);
      return val
    }),
      trendCommitment = {
        description: commitment.description,
        data:
          Object.keys(commitment.data).reduce((acc, k) => {
            acc[k] = 1;
            return acc;
          }, {})
      },
      trendCompleted = {
        description: completed.description,
        data:
          Object.keys(completed.data).reduce((acc, k) => {
            let completionRate = completed.data[k] / commitment.data[k];
            acc[k] = completionRate;
            return acc;
          }, {})
      };
      return [
        trendCommitment,
        trendCompleted
      ];
  }

  render() {
    return (
      <PercentageLineChart data={this.trendData()} colours={this.colours()} title="Velocity Trend" max={2} />
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
)(VelocityTrendMetric);
