import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardTitle from '../DashboardTitle';
import Breadcrumb from '../Breadcrumb';
import LandingPanel from '../LandingPanel';
import StatusIndicator from '../StatusIndicator';
import { ProductTracking, ProductQuality, AgileMaturity, DevelopmentHealth } from '.';
import Overview from './development_health/overview';
import { releaseStatus } from './product_tracking/release_burnup';

class Dashboard extends Component {
  render() {
    let breadcrumbLinks = [
      {
        label: "Home"
      }
    ];
    return (
      <div>
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Agile Dashboard</DashboardTitle>
        <div className="row">
          <div className="small-10 small-offset-1 columns">
            <div className="row">
              <LandingPanel title="Product Tracking" dashboard={ProductTracking} status={releaseStatus(this.props.release)} />
              <LandingPanel title="Product Quality" dashboard={ProductQuality} />
              <LandingPanel title="Agile Maturity" dashboard={AgileMaturity} />
              <LandingPanel title="Development Health" dashboard={DevelopmentHealth} status={(new Overview(this.props.teams.allTeams)).combinedIndicator()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  }
}

export default connect(
  mapStateToProps
)(Dashboard);

