import React from 'react';
import { Pie } from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';

export default class PieChart extends React.Component {
  render() {
    let opts = chartOptions(this.props.options),
      data = chartData("pie", this.props.data, this.props.colours)
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        <Pie ref="chart" data={data} options={opts} />
        {this.props.children}
      </div>
    )
  }
}
