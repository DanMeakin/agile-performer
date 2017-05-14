import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { releaseBurnup, releaseBurnupByTeam } from './release_burnup';
import MultiBarChart from '../../charts/MultiBarChart';
import { burnupBreakdownByTeams } from "../../../actions";

class ReleaseBurnup extends Component {
  constructor(props) {
    super(props);
    this.handleChangeBreakdown = this.handleChangeBreakdown.bind(this);
  }

  handleChangeBreakdown(event) {
    this.props.burnupBreakdownByTeams(event.target.value);
  }

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
      <div className={this.props.className}>
        <MultiBarChart data={this.props.chartData} options={this.chartOptions()}>
          <div className="columns row">
            <h3 className="float-left">
              Release Burnup
              &nbsp;
              <button onClick={this.handleChangeBreakdown} className="button small float-right">Toggle Breakdown</button>
            </h3>
          </div>
        </MultiBarChart>
      </div>
    )
  }
};

function mapStateToProps(state) {
  let burnupFunc;
  if (state.metrics.options.burnupTeamBreakdown) {
    burnupFunc = releaseBurnupByTeam;
  } else {
    burnupFunc = releaseBurnup;
  };
  return {
    chartData: burnupFunc(state.metrics.release)
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      burnupBreakdownByTeams
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ReleaseBurnup);
