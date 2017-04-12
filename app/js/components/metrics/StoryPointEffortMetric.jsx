import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BarLineChart from '../charts/BarLineChart';

class StoryPointEffortMetric extends Component {
    render() {
        return (
            <BarLineChart data={this.props.chartData} title="Story Point Effort(in days)" />
        )
    }
}
function mapStateToProps(state) {
    return {
        chartData: state.metrics.storyPointEffort
    }
}

export default connect(
    mapStateToProps
)(StoryPointEffortMetric);