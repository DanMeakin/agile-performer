import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import Dashboard from '../../dashboards';
import OverviewTable from './OverviewTable';
import Breadcrumb from '../../Breadcrumb';

class ProductTracking extends Component {
  render() {
    let breadcrumbLinks = [
      {
        viewName: Dashboard,
        label: "Home"
      },
      {
        viewName: ProductTracking,
        label: "Product Tracking"
      }
    ];
    return (
      <div className="product-tracking-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <h1>Product Tracking</h1>
        <div className="row">
          <div className="medium-9 columns">
            <ReleaseBurnup className="main-visualisation" />
          </div>
          <div className="medium-3 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductTracking);
