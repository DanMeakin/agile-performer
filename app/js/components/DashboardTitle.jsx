import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class DashboardTitle extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.children}</h1>
        <hr />
      </div>
    )
  }
}
