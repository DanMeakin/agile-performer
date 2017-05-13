import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import releaseBurnup from './release_burnup';
import MultiBarChart from '../../charts/MultiBarChart';

class ReleaseBurnup extends Component {
  chartOptions() {
    let opts = Object.assign({}, this.props.options, {
        scales: {
          yAxes: [
            {
              id: "bars",
              stacked: true,
              ticks: {
                min: 0,
                max: 4000
              }
            },
            {
              id: "lines",
              stacked: false,
              display: false,
              ticks: {
                min: 0,
                max: 4000
              }
            }
          ]
      }
    });
    return opts;
  }

  render() {
    return (
      <MultiBarChart data={this.props.chartData} options={this.chartOptions()} title="Release Burnup" />
    )
  }
};

function mapStateToProps(state) {
  return {
    chartData: releaseBurnup(state.metrics.release)
  }
};

export default connect(
  mapStateToProps
)(ReleaseBurnup);
