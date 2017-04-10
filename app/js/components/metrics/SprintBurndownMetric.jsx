import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../charts/MultiBarChart';

class SprintBurndownMetric extends Component {
    render() {
        console.log("sprintburndown data", this.props.chartData);
        return (
            <MultiBarChart data={this.props.chartData} title="Sprint Burndown" />
        )
    }
}
function mapStateToProps(state) {
    return {
        chartData: state.metrics.sprintBurndown
    }
}

export default connect(
    mapStateToProps
)(SprintBurndownMetric);
