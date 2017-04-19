import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class MetricDescription extends Component {
    render() {
        return (
            <div className="callout primary metric-info">
                <p dangerouslySetInnerHTML={{__html: this.props.leadText}} />
                <p dangerouslySetInnerHTML={{__html: this.props.breadText}} />
            </div>
        )
    }
}