import React from 'react';
import Chart from 'react-chartjs';
import chartData from '../lib/data_transformer';
import RGB from '../lib/rgb';

const RadarChart = Chart.Radar;

const defaultColours = [
  new RGB(179, 181, 198),
  new RGB(255, 99, 132),
  new RGB(205, 99, 255),
  new RGB(99, 126, 255),
  new RGB(99, 255, 215)
]

export default class TeamSkillsChart extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <RadarChart data={chartData(this.props.data, this.props.colours)} options={this.props.options} width="600" height="400"/>
      </div>
    )
  }
}
