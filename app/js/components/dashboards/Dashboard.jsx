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
import QualityOverview from './product_quality/overview'
import AgileOverview from './agile_maturity/overview'

class Dashboard extends Component {
  render() {
    let breadcrumbLinks = [
      {
        label: "Home"
      }
    ];
    let teams = this.props.teams,
    release = this.props.release
    return (
      <div>
        <Breadcrumb links={breadcrumbLinks} />
        <DashboardTitle>Agile Dashboard</DashboardTitle>
        <div className="row">
          <div className="small-10 small-offset-1 columns">
            <div className="row">
              <LandingPanel title="Product Tracking" dashboard={ProductTracking} status={releaseStatus(this.props.release)} />
              <LandingPanel title="Product Quality" dashboard={ProductQuality} status={(new QualityOverview(release, teams)).totalDefectIndicator()}/>
              <LandingPanel title="Agile Maturity" dashboard={AgileMaturity} status={(new AgileOverview(release, teams)).totalMaturityIndicator()}/>
              <LandingPanel title="Development Health" dashboard={DevelopmentHealth} status={(new Overview(teams.allTeams)).combinedIndicator()} />
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

