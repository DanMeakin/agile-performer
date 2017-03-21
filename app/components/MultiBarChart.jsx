import React from 'react';
import Chart from 'react-chartjs';
import chartData from '../lib/data_transformer';
import RGB from '../lib/rgb';

const BarChart = Chart.Bar;

export default class MultiBarChart extends React.Component {
  componentDidMount() {
    var legend = this.refs.chart.getChart().generateLegend();
    console.log(legend);

    this.setState({
      legend: legend
    });
  }

  render() {
    let data = chartData(this.props.data, this.props.colours);
    let legend = this.state && this.state.legend || '';

    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className="legend" dangerouslySetInnerHTML={{__html: legend}} />
        <BarChart ref="chart" data={data} options={this.props.options} width="600" height="400" />
      </div>
    )
  }
}
