import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMetric } from '../actions';

class Breadcrumb extends Component {
  breadcrumbLinks() {
    let finalLink = label => (
        <li key={"breadcrumb-" + label}>
          {label}
        </li>
    ),
      regularLink = (view, label) => (
        <li key={"breadcrumb-" + label}>
          <a href="#" onClick={() => this.props.selectMetric(view)}>{label}</a>
        </li>
    );
    return this.props.links.map(({ view, label }, idx, allLinks) => {
        if (idx == allLinks.length - 1) {
          return finalLink(label);
        } else {
          return regularLink(view, label);
        }
    })
  }

  render() {
    return (
      <nav aria-label="You are here:" role="navigation" className="breadcrumb">
        <ul className="breadcrumbs">
          {this.breadcrumbLinks()}
        </ul>
      </nav>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric
    },
    dispatch
  );
}

export default connect(
  null,
  matchDispatchToProps
)(Breadcrumb)
