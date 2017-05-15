import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StatusIndicator from '../../StatusIndicator';
import Overview from './overview';
import TeamProductQualityContainer from './TeamProductQualityContainer';
import { selectTeamDashboard } from '../../../actions';

class QualityOverviewTable extends Component {
  constructor(props) {
    super(props);
    this.handleSelectDashboard = this.handleSelectDashboard.bind(this);
  }

  handleSelectDashboard(teamName) {
    this.props.selectTeamDashboard(teamName, TeamProductQualityContainer);
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
            </tr>
          </thead>
          <tbody>
            {teamNames.map(teamName => (
              <tr key={"team-" + teamName + "-overview"} onClick={() => this.handleSelectDashboard(teamName)}>
                <td className="team-name">{teamName}</td>
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
