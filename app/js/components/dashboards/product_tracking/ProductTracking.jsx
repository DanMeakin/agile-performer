import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import { Dashboard } from '../../dashboards';
import OverviewTable from './OverviewTable';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';

class ProductTracking extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: ProductTracking,
        label: "Product Tracking"
      }
    ];
    return (
      <div className="product-tracking-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Product Tracking</DashboardTitle>
        <div className="row">
          <div className="medium-8 columns">
            <ReleaseBurnup className="main-visualisation" />
          </div>
          <div className="medium-4 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductTracking);
