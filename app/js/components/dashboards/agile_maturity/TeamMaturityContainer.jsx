import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../../dashboards';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';
import TeamSelector from '../../TeamSelector';
import AgileMaturityContainer from '../AgileMaturityContainer';
import SprintBurndownTrend from './SprintBurndownTrend';
import CodeOwnership from './CodeOwnership';
import VelocityTrend from './VelocityTrend';
import SprintInterference from './SprintInterference';
import ScrumPractices from './ScrumPractices';
import XpPractices from './XpPractices';
import OtherPractices from './OtherPractices';


class TeamMaturityContainer extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: AgileMaturityContainer,
        label: "Agile Maturity"
      },
      {
        view: TeamMaturityContainer,
        label: "Team Maturity"
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
            <VelocityTrend />
          </div>
          <div className="medium-6 columns">
            <SprintBurndownTrend />
          </div>
          <div className="medium-6 columns">
            <CodeOwnership />
          </div>
          <div className="medium-6 columns">
            <SprintInterference />
          </div>
          <div className="medium-6 columns">
            <ScrumPractices />
          </div>
          <div className="medium-6 columns">
            <XpPractices />
          </div>
          <div className="medium-6 columns">
            <OtherPractices />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(TeamMaturityContainer);