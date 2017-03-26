import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric } from "../actions";

class NavBar extends Component {

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

  render() {
    return (
      <ul className="menu vertical" >
        {this.renderMenuItems()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  console.log("state of menuitem: ", state)
  return {
    menuItems: state.menuItems
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectMetric: selectMetric
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(NavBar)
