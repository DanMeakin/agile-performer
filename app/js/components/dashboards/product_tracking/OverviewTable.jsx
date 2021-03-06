import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import StatusIndicator from '../../StatusIndicator';
import Overview from './overview';
import ProductTeamTracking from './ProductTeamTracking';
import { selectTeamDashboard } from '../../../actions';

class OverviewTable extends Component {
  constructor(props) {
    super(props);
    this.handleSelectDashboard = this.handleSelectDashboard.bind(this);
  }

  handleSelectDashboard(teamName) {
    this.props.selectTeamDashboard(teamName, ProductTeamTracking);
  }

  render() {
    let teamNames = this.props.teams.shortNames;
    let overview = new Overview(this.props.release);
    return (
      <div className="chart-panel">
        <h3>Team Overview</h3>
        <table className="unstriped hover team-overview-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Stability</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {teamNames.map(teamName => (
              <tr key={"team-" + teamName + "-overview"} onClick={() => this.handleSelectDashboard(teamName)}>
                <td className="team-name">{teamName}</td>
                <td className="indicator">
                  <StatusIndicator colour={overview.velocityIndicator(teamName)} />
                </td>
                <td className="indicator">
                  <StatusIndicator colour={overview.deliveryIndicator(teamName)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    release: state.metrics.release,
    teams: state.metrics.teams
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectTeamDashboard
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(OverviewTable);
