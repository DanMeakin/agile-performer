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

  selectBox() {
    return (
      <select className="input-group-field" onChange={this.handleSelectTeam} value={this.props.currentTeam}>
        {this.props.teamNames.map(teamName => (
          <option value={teamName} key={teamName}>{"Team " + teamName}</option>
        ))
        }
      </select>
    );
  }
  renderWithLabelAbove() {
    return (
      <div className="input-group team-selector-top">
        <label>Team
          {this.selectBox()}
        </label>
      </div>
    );
  }

  renderWithLabelLeft() {
    return (
      <div className="input-group team-selector-left">
        <div className="row">
          <div className="small-3 columns">
            <label for="middle-label" className="text-right middle">Team</label>
          </div>
          <div className="small-9 columns">
            {this.selectBox()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.labelPosition == "left") {
      return this.renderWithLabelLeft()
    } else {
      return this.renderWithLabelAbove()
    }
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
