import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import StatusIndicator from '../../StatusIndicator';
import Overview from './overview';

class OverviewTable extends Component {
  render() {
    let teamNames = this.props.teams.shortNames;
    let overview = new Overview(this.props.release);
    return (
      <div>
        <h3>Team Overview</h3>
        <table className="unstriped team-overview-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Stability</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {teamNames.map(teamName => (
              <tr key={"team-" + teamName + "-overview"}>
                <td>{teamName}</td>
                <td><StatusIndicator value={overview.velocityIndicator(teamName)} /></td>
                <td><StatusIndicator value={overview.deliveryIndicator(teamName)} /></td>
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

export default connect(mapStateToProps)(OverviewTable);
