import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../../dashboards';
import OverviewTable from './OverviewTable';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';
import TotalBurndownTrend from './TotalBurndownTrend'

class AgileMaturity extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: AgileMaturity,
        label: "Agile Maturity"
      }
    ];
    return (
      <div className="product-tracking-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Agile Maturity</DashboardTitle>
        <div className="row">
          <div className="medium-8 columns">
            <TotalBurndownTrend className="main-visualisation" />
          </div>
          <div className="medium-4 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AgileMaturity);
