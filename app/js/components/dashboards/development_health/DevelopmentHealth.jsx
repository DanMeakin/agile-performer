import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../../dashboards';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';
import HappinessOverview from './HappinessOverview';
import SatisfactionOverview from './SatisfactionOverview';

class DevelopmentHealth extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: DevelopmentHealth,
        label: "Development Health"
      }
    ];
    return (
      <div className="development-health-dashboard">
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Development Health</DashboardTitle>
        <div className="row">
          <div className="medium-8 columns">
            <HappinessOverview className="main-visualisation" />
          </div>
          <div className="medium-4 columns">
            <SatisfactionOverview className="main-visualisation" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(DevelopmentHealth);
