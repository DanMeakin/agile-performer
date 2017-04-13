import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric, filterMetrics } from "../actions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
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
        <li className="nav-entry" key={metric.type}>
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
          <h5 className="nav-titel">Agile Performer</h5>
          <form>
            <input type="text" value={this.props.metricFilter} onChange={this.handleFilterChange} placeholder="Search.." />
          </form>
        </header>
      </div>
    )
  }

  handleFilterChange(event) {
    this.props.filterMetrics(event.target.value);
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
    menuItems: state.menuItems,
    metricFilter: state.metricFilter
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric,
      filterMetrics: filterMetrics
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NavBar)
