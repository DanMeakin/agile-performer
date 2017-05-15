import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../dashboards';
import OverviewTable from './agile_maturity/OverviewTable';
import Breadcrumb from '../Breadcrumb';
import DashboardTitle from '../DashboardTitle';
import SprintBurndownTrend from './agile_maturity/SprintBurndownTrend'

class AgileMaturityContainer extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: AgileMaturityContainer,
        label: "Agile Maturity"
      }
    ];
    return (
      <div className="product-tracking-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Agile Maturity</DashboardTitle>
        <div className="row">
          <div className="medium-8 columns">
            <SprintBurndownTrend className="main-visualisation" />
          </div>
          <div className="medium-4 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AgileMaturityContainer);