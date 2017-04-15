import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';

class SprintCadenceMetric extends Component {
    render() {
        console.log("sprintburndown data", this.props.chartData);
        return (
            <BarLineChart data={this.props.chartData} title="Sprint Burndown" />
        )
    }
}
function mapStateToProps(state) {
    return {
        chartData: state.metrics.sprintCadence
    }
}

export default connect(
    mapStateToProps
)(SprintCadenceMetric);
