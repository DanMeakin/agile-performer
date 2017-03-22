import React from 'react';
import {Radar} from 'react-chartjs-2';
import chartData from '../lib/data_transformer';
import chartOptions from '../lib/chart_options';
import RGB from '../lib/rgb';

export default class TeamSkillsChart extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Radar data={chartData("radar", this.props.data, this.props.colours)} options={chartOptions(this.props.options)} />
      </div>
    )
  }
}
