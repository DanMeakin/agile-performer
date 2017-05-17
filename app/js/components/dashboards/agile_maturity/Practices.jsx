import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../../charts/MultiBarChart';
import { togglePracticesByPractice } from '../../../actions';

class Practices extends Component {
  constructor(props) {
    super(props);
    this.handleToggleBreakdown = this.handleToggleBreakdown.bind(this);
  }

  handleToggleBreakdown(event) {
    this.props.togglePracticesByPractice(event.target.value);
  }

  render() {
    return (
      <div>
        <MultiBarChart className="practices-chart" height={450} data={this.props.chartData} options={this.props.options}>
          <div className="columns row">
            <h3 className="float-left">
              Practices
              &nbsp;
              <button onClick={this.handleToggleBreakdown} className="button small float-right">Toggle Breakdown</button>
            </h3>
          </div>
        </MultiBarChart>
      </div>

    )
  }
}

function mapStateToProps(state) {
  let currentTeam = state.metrics.currentTeam,
    displayByPractices = state.metrics.options.practicesByPractice,
    dataFunc,
    displayTicks = value => {
      let adoptionLabels = {
        1: "Adoption",
        2: "Adaptation",
        3: "Acceptance",
        4: "Routinisation",
        5: "Infusion"
      };
      return adoptionLabels[value] || "";
    },
    options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            callback: displayTicks,
            min: 0,
            max: 5,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
     };
  if (displayByPractices) {
    dataFunc = team => team.practicesDataByPractice();
    options.legend = { display: false };
  } else {
    dataFunc = team => team.practicesData();
    options.legend = { display: true };
  }
  let chartData = dataFunc(state.metrics.teams.selectTeam(currentTeam));
  return {
    chartData,
    options
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      togglePracticesByPractice
    },
    dispatch
  );
}


export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Practices);
