import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MultiBarChart from '../../charts/MultiBarChart';
import StatusIndicator from '../../StatusIndicator';
import Overview from './overview';
import TeamHealth from './TeamHealth';
import { selectTeamDashboard } from '../../../actions';

class SatisfactionOverview extends Component {
  constructor(props) {
    super(props);
    this.handleSelectDashboard = this.handleSelectDashboard.bind(this);
  }

  handleSelectDashboard(teamName) {
    this.props.selectTeamDashboard(teamName, TeamHealth);
  }

  render() {
    let teams = this.props.teams.allTeams,
      teamNames = this.props.teams.shortNames,
      satisfactionOverview = new Overview(teams);

    return (
      <div className="chart-panel">
        <h3>Satisfaction Overview</h3>
        <table className="unstriped hover team-overview-table">
          <thead>
            <tr>
              <th className="criterion-heading">Team</th>
              <th key="heading-happiness" className="criterion-heading">Happiness</th>
              <th key="heading-satisfaction" className="criterion-heading">Satisfaction</th>
            </tr>
          </thead>
          <tbody>
            {teamNames.map(teamName => (
              <tr key={"team-" + teamName + "-overview"} onClick={() => this.handleSelectDashboard(teamName)}>
                <td className="team-name">{teamName}</td>
                  <td className="indicator" key={"indicator-" + teamName + "-happiness"}>
                   <StatusIndicator colour={satisfactionOverview.happinessIndicator(teamName).colour} trend={satisfactionOverview.happinessIndicator(teamName).trend} />
                  </td>
                  <td className="indicator" key={"indicator-" + teamName + "-satisfaction"}>
                   <StatusIndicator colour={satisfactionOverview.satisfactionIndicator(teamName).colour} trend={satisfactionOverview.satisfactionIndicator(teamName).trend} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
)(SatisfactionOverview);
