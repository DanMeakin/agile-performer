import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric, filterMetrics, selectTeam } from "../actions";
import TeamSelector from './TeamSelector';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
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
            <TeamSelector />
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
  return {
    menuItems: state.menuItems.items,
    metricFilter: state.menuItems.filterTerm,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric,
      filterMetrics: filterMetrics,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NavBar)
