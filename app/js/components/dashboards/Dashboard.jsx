import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardTitle from '../DashboardTitle';
import Breadcrumb from '../Breadcrumb';

export default class Dashboard extends Component {
  render() {
    let breadcrumbLinks = [
      {
        label: "Home"
      }
    ];
    return (
      <div>
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Agile Dashboard</DashboardTitle>
      </div>
    )
  }
}
