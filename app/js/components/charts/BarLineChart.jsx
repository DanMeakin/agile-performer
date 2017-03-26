import React from 'react';
import {Bar} from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';
import RGB from '../../lib/rgb';

export default class BarLineChart extends React.Component {
  render() {
    let opts = chartOptions(this.props.options),
        data = chartData("bar", this.props.data, this.props.colours)
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        <Bar data={data} options={opts} />
      </div>
    )
  }
}
