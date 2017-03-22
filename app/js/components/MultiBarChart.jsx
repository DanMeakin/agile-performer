import React from 'react';
import {Bar} from 'react-chartjs-2';
import chartData from '../lib/data_transformer';
import chartOptions from '../lib/chart_options';
import RGB from '../lib/rgb';

export default class MultiBarChart extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Bar ref="chart" data={chartData("bar", this.props.data, this.props.colours)} options={chartOptions(this.props.options)} />
      </div>
    )
  }
}
