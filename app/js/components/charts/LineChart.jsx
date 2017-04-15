import React from 'react';
import { Line } from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';

export default class LineChart extends React.Component {
  render() {
    let opts = chartOptions(this.props.options),
      data = chartData("line", this.props.data, this.props.colours)
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        {this.props.children}
        <Line ref="chart" data={data} options={opts} />
      </div>
    )
  }
}
