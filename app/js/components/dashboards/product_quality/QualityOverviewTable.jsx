import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StatusIndicator from '../../StatusIndicator';
import Overview from './overview';
import TeamProductQuality from './TeamProductQuality';
import { selectTeamDashboard } from '../../../actions';

class QualityOverviewTable extends Component {
  constructor(props) {
    super(props);
    this.handleSelectDashboard = this.handleSelectDashboard.bind(this);
  }

  handleSelectDashboard(teamName) {
    this.props.selectTeamDashboard(teamName, TeamProductQuality);
  }

  render() {
    let teamNames = this.props.teams.shortNames;
    let overview = new Overview(this.props.release, this.props.teams);
    return (
      <div className="chart-panel">
        <h3>Team Overview</h3>
        <table className="unstriped hover team-overview-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {teamNames.map(teamName => (
              <tr key={"team-" + teamName + "-overview"} onClick={() => this.handleSelectDashboard(teamName)}>
                <td className="team-name">{teamName}</td>
                <td className="indicator">
                  <StatusIndicator colour={overview.defectIndicator(teamName)} />
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
)(QualityOverviewTable);
