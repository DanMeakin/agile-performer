import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dashboard } from '../../dashboards';
import Breadcrumb from '../../Breadcrumb';
import DashboardTitle from '../../DashboardTitle';
import DevelopmentHealth from './DevelopmentHealth';
import TeamSelector from '../../TeamSelector';
import Happiness from '../product_tracking/Happiness';
import Satisfaction from '../product_tracking/Satisfaction';

class TeamHealth extends Component {
  render() {
    let breadcrumbLinks = [
      {
        view: Dashboard,
        label: "Home"
      },
      {
        view: DevelopmentHealth,
        label: "Development Health"
      },
      {
        view: TeamHealth,
        label: "Team Health"
      }
    ];
    return (
      <div className="development-health-dashboard">
        <div className="row">
          <div className="medium-6 columns">
            <Breadcrumb links={breadcrumbLinks} />
          </div>
          <div className="medium-6 columns">
            <TeamSelector labelPosition="left" />
          </div>
        </div>
        <DashboardTitle>Team Health</DashboardTitle>
        <div className="row">
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

function mapStateToProps(state) {
  return {
    teams: state.metrics.teams
  };
};

export default connect(
  mapStateToProps
)(TeamHealth);
