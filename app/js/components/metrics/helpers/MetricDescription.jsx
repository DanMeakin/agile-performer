import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class MetricDescription extends Component {
    render() {
      let leadText = this.props.description.leadText,
          bodyText = this.props.description.bodyText;
      return (
          <div className="callout primary metric-info">
            <p className="lead">
              {leadText}
            </p>
            <p dangerouslySetInnerHTML={{ __html: bodyText}} />
          </div>
      )
    }
}
