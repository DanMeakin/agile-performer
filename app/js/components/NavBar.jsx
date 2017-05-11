import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric, filterMetrics, selectTeam } from "../actions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.handleSelectTeam = this.handleSelectTeam.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
  }

  renderMenuItems() {
    return this.props.menuItems.map((item, i) =>
      (
        <div className="nav-group" key={`nav-group-${i}`}>
          {this.renderMenuHeading(item.heading)}
          {this.renderEntries(item.metrics)}
        </div>
      )
    )
  }

  renderMenuHeading(heading) {
    return (
      <li className="nav-heading">{heading}</li>
    )
  }

  renderEntries(metrics) {
    return metrics.map((metric) =>
      (
        <li className="nav-entry" key={metric.name}>
          <a href="#" onClick={() => this.props.selectMetric(metric.type)}>
            {metric.name}
          </a>
        </li>
      )
    )
  }

  renderNavBarHeading() {
    return (
      <div className="row collapse postfix-round">
        <header className="nav-header" role="banner">
          <h5 className="nav-title">Agile Performer</h5>
          <form>
            <div className="input-group">
              <input className="input-group-field" type="text" value={this.props.metricFilter} onChange={this.handleFilterChange} placeholder="Search.." />
              <div className="input-group-button">
                <button className="button" onClick={this.clearFilter}>×</button>
              </div>
            </div>
            <div className="input-group">
              <label>Team
                <select className="input-group-field" onChange={this.handleSelectTeam}>
                  {this.props.teamNames.map(teamName => (
                    <option value={teamName} key={teamName}>{"Team " + teamName}</option>
                  ))
                  }
                </select>
              </label>
            </div>
          </form>
        </header>
      </div>
    )
  }

  handleFilterChange(event) {
    this.props.filterMetrics(event.target.value);
  }

  clearFilter(event) {
    this.props.filterMetrics("");
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
      <div className="sidenav">
        {this.renderNavBarHeading()}
        <ul className="menu vertical" >
          {this.renderMenuItems()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let teamNames = Object.keys(state.metrics.teams).map(key => (
      state.metrics.teams[key].name
  ));
  return {
    menuItems: state.menuItems.items,
    metricFilter: state.menuItems.filterTerm,
    currentTeam: state.metrics.currentTeam,
    teamNames
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric,
      filterMetrics: filterMetrics,
      selectTeam: selectTeam
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NavBar)
