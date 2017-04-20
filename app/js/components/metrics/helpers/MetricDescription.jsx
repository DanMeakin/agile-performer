import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class MetricDescription extends Component {
    render() {
        return (
            <div className="callout primary metric-info">
              <p className="lead">
                {this.props.leadText}
              </p>
              <p>
                {this.props.breadText}
              </p>
            </div>
        )
    }
}
