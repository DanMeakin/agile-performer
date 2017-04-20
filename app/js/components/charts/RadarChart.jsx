import React from 'react';
import {Radar} from 'react-chartjs-2';
import chartData from '../../lib/data_transformer';
import chartOptions from '../../lib/chart_options';
import RGB from '../../lib/rgb';

export default class RadarChart extends React.Component {
  render() {
    return (
      <div className="chart-panel">
        <h3>{this.props.title}</h3>
        <Radar data={chartData("radar", this.props.data, this.props.colours)} options={chartOptions(this.props.options)} />
        {this.props.children}
      </div>
    )
  }
}
