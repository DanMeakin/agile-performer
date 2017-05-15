import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../../dashboards';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';
import TeamSelector from '../../TeamSelector';
import ProductTracking from '../product_tracking';
import Happiness from './Happiness';
import Satisfaction from './Satisfaction';
import Velocity from './Velocity';
import SprintBurndown from './SprintBurndown';

class ProductTeamTracking extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: ProductTracking,
        label: "Product Tracking"
      },
      {
        view: ProductTeamTracking,
        label: "Team Tracking"
      }
    ];
    return (
      <div className="product-tracking-dashboard">
        <div className="row">
          <div className="medium-6 columns">
            <Breadcrumb links={breadcrumbLinks} />
          </div>
          <div className="medium-6 columns">
            <TeamSelector labelPosition="left" />
          </div>
        </div>
        <DashboardTitle>Team Tracking</DashboardTitle>
        <div className="row">
          <div className="medium-6 columns">
            <Velocity />
          </div>
          <div className="medium-6 columns">
            <SprintBurndown />
          </div>
          <div className="medium-6 columns">
            <Happiness />
          </div>
          <div className="medium-6 columns">
            <Satisfaction />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductTeamTracking);
