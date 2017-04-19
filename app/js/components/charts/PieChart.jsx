import React from 'react';
import { Pie } from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';
import MetricDescription from '../metrics/helpers/MetricDescription'

export default class PieChart extends React.Component {
  render() {
    console.log(this.props.data, "Data???!")
    let opts = chartOptions(this.props.options),
      data = chartData("pie", this.props.data.chart, this.props.colours)
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        {this.props.children}
        <Pie ref="chart" data={data} options={opts} />
        <MetricDescription leadText={this.props.data.description.leadText} breadText={this.props.data.description.breadText} />
      </div>
    )
  }
}
