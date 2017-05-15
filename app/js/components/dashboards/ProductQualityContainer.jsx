import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../dashboards';
import OverviewTable from './product_quality/QualityOverviewTable';
import Breadcrumb from '../Breadcrumb';
import DashboardTitle from '../DashboardTitle';
import TotalDefects from './product_quality/TotalDefects'

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
            <TotalDefects className="main-visualisation" />
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