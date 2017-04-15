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
      <MultiBarChart data={this.props.chartData} options={this.chartOptions()} title="Enhanced Release Burndown">
        <p className="lead">
          Enhanced Release Burndown measures the release burndown rate for a
          given Scrum team, with an adjustment made for additional requirements
          added to the release after initial planning.
        </p>
        <p>
          The purpose of this chart is to illustrate the impact of additional
          requirements on the delivery of a planned release. Additional requirements
          will push back the release date.
        </p>
        <p>
          Release is estimated to take place where
          the <em>Estimated Release Trend</em> line
          meets the <em>x</em>-axis. With additional requirements added, the
          likely release date will be pushed back to where the <em>Adjusted Release
          Trend</em> line meets the <em>Estimated Release Trend</em> line.
        </p>
      </MultiBarChart>
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

