import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric, filterMetrics, selectTeam } from "../actions";

class TeamSelector extends Component {
  constructor(props) {
    super(props);
    this.handleSelectTeam = this.handleSelectTeam.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
  }

  handleSelectTeam(event) {
    console.log("Target value", event.target.value);
    this.props.selectTeam(event.target.value);
  }

  clearTeam(event) {
    this.props.selectTeam(null);
  }

  render() {
    return (
      <div className="input-group">
        <label>Team
          <select className="input-group-field" onChange={this.handleSelectTeam} defaultValue="---">
            <option value={null} key="empty" disabled="true">---</option>
            {this.props.teamNames.map(teamName => (
              <option value={teamName} key={teamName}>{"Team " + teamName}</option>
            ))
            }
          </select>
        </label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let teamNames = state.metrics.teams.shortNames;
  return {
    currentTeam: state.metrics.currentTeam,
    teamNames
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectTeam
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(TeamSelector)
