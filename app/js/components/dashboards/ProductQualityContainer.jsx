import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../dashboards';
import OverviewTable from './agile_maturity/OverviewTable';
import Breadcrumb from '../Breadcrumb';
import DashboardTitle from '../DashboardTitle';
import DefectsOverTime from './product_quality/DefectsOverTime'

class ProductQualityContainer extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: ProductQualityContainer,
        label: "Product Quality"
      }
    ];
    return (
      <div id="product-quality-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Product Quality</DashboardTitle>
        <div className="row">
          <div className="medium-8 columns">
            <DefectsOverTime className="main-visualisation" />
          </div>
          <div className="medium-4 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductQualityContainer);