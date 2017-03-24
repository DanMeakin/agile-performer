import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectMetric } from "../actions";

class NavBar extends Component {

  renderMenuItems(){
    console.log("this is menuitems: ", this.props.menuItems);
    return this.props.menuItems.map((item, i) =>
      (
        <div className="nav-group" key={`nav-group-${i}`}>
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
        <li className="nav-entry" key={entry.metric}>
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
        <ul className="menu vertical" >
          {this.renderMenuItems()}
        </ul>
      </div>
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
