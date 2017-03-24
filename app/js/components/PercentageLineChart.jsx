import React from 'react';
import {Line} from 'react-chartjs-2';
import chartData from '../lib/data_transformer';
import chartOptions from '../lib/chart_options';
import RGB from '../lib/rgb';

const percentageScaleOpts = {
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

export default class PercentageLineChart extends React.Component {
  render() {
    let opts = chartOptions(
      Object.assign({}, percentageScaleOpts, this.props.options)
    ),
        data = chartData("line", this.props.data, this.props.colours);
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Line ref="chart" data={data} options={opts} />
      </div>
    )
  }
}
