
import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import BarLineChart from './BarLineChart';
import MultiBarChart from './MultiBarChart';
import SprintChart from './SprintChart';
import TeamSkillsChart from './TeamSkillsChart';
import RGB from 'js/lib/rgb';
import {selectView} from 'js/actions/view_actions';

var testCovOpts = {
  scales: {
    yAxes: [{
      ticks: {
        callback: val => (
          (val * 100).toFixed() + "%"
        ),
        suggestedMin: 0,
        suggestedMax: 1,
        beginAtZero: true
      }
    }]
  }
}

var colours = [
  new RGB(238, 64, 53),
  new RGB(243, 119, 54),
  new RGB(253, 244, 152),
  new RGB(123, 192, 67),
  new RGB(3, 146, 207)
];

class App extends Component {
  render() {
    return (
      <div>
      <TeamSkillsChart data={this.props.metrics.scrumPractices} colours={colours} title="Scrum Practices" />
      <TeamSkillsChart data={this.props.metrics.teamSkills} colours={colours} title="Team Skills"/>
      <SprintChart data={this.props.metrics.linesOfCode} colours={colours} title="Lines of Code" />
      <SprintChart data={this.props.metrics.testCoverage} colours={colours} options={testCovOpts} title="Code Coverage" />
      <MultiBarChart data={this.props.metrics.storyPoints} colours={colours} title="Story Points" />
      <MultiBarChart data={this.props.metrics.happinessIndex} colours={colours} title="Happiness" />
      <BarLineChart data={this.props.metrics.burndown()} colours={colours} title="Burndown" />
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectView: selectView
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(App);
