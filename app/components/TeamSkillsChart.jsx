import React from 'react';
import Chart from 'react-chartjs';
import RGB from '../lib/rgb';

const RadarChart = Chart.Radar;

console.log(RadarChart);

const defaultColours = [
  new RGB(179, 181, 198),
  new RGB(255, 99, 132)
]

export default class TeamSkillsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: props.labels,
      data: props.data,
      colours: props.colours || this.defaultColours(),
      options: props.options
    }
  }

  defaultColours() {
    return defaultColours;
  }

  chartData() {
    var colours = this.state.colours;
    var makeDataset = function(data, i) {
      let colour = colours[i];
      return {
        label: data.label,
        fillColor: colour.toRGBA(0.2),
        strokeColor: colour.toRGBA(1),
        pointColor: colour.toRGBA(1),
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: colour.toRGBA(1),
        data: data.values
      }
    }
    return {
      labels: this.state.labels,
      datasets: this.state.data.map(makeDataset)
    }
  }

  options() {
    return this.state.options;
  }

  render() {
    console.log(this.chartData);
    return (
      <RadarChart data={this.chartData()} options={this.options()} width="600" height="400"/>
    )
  }
}
