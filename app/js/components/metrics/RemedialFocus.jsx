import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../charts/MultiBarChart';

class RemedialFocusMetric extends Component {
  remedialChartData() {
    let commitment = this.props.chartData.find(entry => {
      return entry.description == "Commitment";
    });
    return [
      { description: "Bug Fixing",
        stack: "remedialFocus",
        data: Object.keys(commitment.data).reduce((acc, k) => {
          acc[k] = commitment.data[k].bugFixPoints;
          return acc;
        }, {})
      },
      { description: "User Stories",
        stack: "remedialFocus",
        data: Object.keys(commitment.data).reduce((acc, k) => {
          acc[k] = commitment.data[k].userStoryPoints;
          return acc;
        }, {})
      }
    ];
  }

  remedialChartOptions() {
    let opts = Object.assign({}, this.props.options, {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
      }
    });
    console.log("Remedial options", opts);
    return opts;
  }

  render() {
    return (
      <MultiBarChart data={this.remedialChartData()} options={this.remedialChartOptions()} title="Remedial Focus" />
    )
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.detailedVelocity
  };
};

export default connect(
  mapStateToProps
)(RemedialFocusMetric);
