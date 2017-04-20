import React from 'react';
import {Line} from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';

const percentageScaleOpts = (min, max) => {
  return {
    scales: {
      yAxes: [{
        ticks: {
          callback: val => (
            (val * 100).toFixed() + "%"
          ),
          suggestedMin: min || 0,
          suggestedMax: max || 1,
          beginAtZero: true
        }
      }]
    }
  };
}

export default class PercentageLineChart extends React.Component {
  render() {
    let opts = chartOptions(
      Object.assign({}, percentageScaleOpts(this.props.min, this.props.max), this.props.options)
    ),
        data = chartData("line", this.props.data, this.props.colours);
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        <Line ref="chart" data={data} options={opts} />
        {this.props.children}
      </div>
    )
  }
}
