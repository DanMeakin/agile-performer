import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardTitle from '../DashboardTitle';
import Breadcrumb from '../Breadcrumb';
import LandingPanel from '../LandingPanel';
import { ProductTracking, ProductQuality, AgileMaturity, DevelopmentHealth } from '.';

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
        <div className="row">
          <LandingPanel title="Product Tracking" dashboard={ProductTracking} />
          <LandingPanel title="Product Quality" dashboard={ProductQuality} />
          <LandingPanel title="Agile Maturity" dashboard={AgileMaturity} />
          <LandingPanel title="Development Health" dashboard={DevelopmentHealth} />
        </div>
      </div>
    )
  }
}
