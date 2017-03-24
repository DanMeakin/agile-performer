import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric } from "../actions";

class NavBar extends Component {

  renderMenuItems(){
    return this.props.menuItems.map((item) =>
      (
        <div className="nav-group">
          {this.renderMenuHeading(item.heading)}
          {this.renderSubMenu(item.entries)}
        </div>
      )
    )
  }

  renderMenuHeading(heading) {
    return (
      <li className="nav-heading">{heading}</li>
    )
  }

  renderSubMenu(entries) {
    return entries.map((entry) =>
      (
        <li className="nav-entry">
          <a href="#" onClick={() => this.props.selectMetric(entry.metric)}>
            {entry.name}
          </a>
        </li>
      )
    )
  }

  render(){
    return(
      <div>
        <ul className="menu vertical">
          {this.renderMenuItems()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
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
)
