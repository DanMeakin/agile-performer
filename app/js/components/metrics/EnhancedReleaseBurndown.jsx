import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../charts/MultiBarChart';

class EnhancedReleaseBurndownMetric extends Component {
  chartOptions() {
    let opts = Object.assign({}, this.props.options, {
        scales: {
          yAxes: [
            {
              stacked: false
            },
          ]
      }
    });
    return opts;
  }

  render() {
    return (
      <MultiBarChart data={this.props.chartData} options={this.chartOptions()} title="Enhanced Release Burndown" />
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.metrics.releaseBurndown
  }
}

export default connect(
  mapStateToProps
)(EnhancedReleaseBurndownMetric);

