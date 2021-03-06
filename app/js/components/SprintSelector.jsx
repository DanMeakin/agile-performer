
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectSprint } from "../actions";

class SprintSelector extends Component {
  constructor(props) {
    super(props);
    this.handleSelectSprint = this.handleSelectSprint.bind(this);
  }

  handleSelectSprint(event) {
    this.props.selectSprint(event.target.value);
  }

  render() {
    return (
      <div className="input-group sprint-selector">
        <div className="row">
          <div className="small-6 columns">
            <label for="middle-label" className="text-right middle">Sprint No.</label>
          </div>
          <div className="small-6 columns">
            <select className="input-group-field" onChange={this.handleSelectSprint} defaultValue={this.props.currentSprint}>
            {this.props.sprintOptions.map(sprintNum => (
              <option value={sprintNum} key={"sprint-" + sprintNum}>{sprintNum}</option>
            ))
          }
            </select>
          </div>
        </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  let teamNames = state.metrics.teams.shortNames;
  return {
    currentSprint: state.metrics.options.focusedSprint,
    sprintOptions: [1, 2, 3, 4, 5]
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectSprint
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(SprintSelector)
