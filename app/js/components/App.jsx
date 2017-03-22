import BarLineChart from './BarLineChart';
import MultiBarChart from './MultiBarChart';
import SprintChart from './SprintChart';
import TeamSkillsChart from './TeamSkillsChart';
import React, { Component } from 'react';
import { scrumPractices, xpPractices } from 'js/mocked_data/practices';
import { teamSkills } from 'js/mocked_data/team_skills';
import { linesOfCode, testCoverage } from 'js/mocked_data/test';
import { storyPoints } from 'js/mocked_data/story_points';
import { happinessIndex } from 'js/mocked_data/happiness_index';
import { burndown } from 'js/mocked_data/burndown';
import RGB from 'js/lib/rgb';

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
      <TeamSkillsChart data={scrumPractices} colours={colours} title="Scrum Practices" />
      <TeamSkillsChart data={teamSkills} colours={colours} title="Team Skills"/>
      <SprintChart data={linesOfCode} colours={colours} title="Lines of Code" />
      <SprintChart data={testCoverage} colours={colours} options={testCovOpts} title="Code Coverage" />
      <MultiBarChart data={storyPoints} colours={colours} title="Story Points" />
      <MultiBarChart data={happinessIndex} colours={colours} title="Happiness" />
      <BarLineChart data={burndown() } colours={colours} title="Burndown" />
    </div>
    )
  }
}

export default App;
