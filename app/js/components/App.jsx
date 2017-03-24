import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MetricContainer from './MetricContainer';
import NavBar from './NavBar';
import RGB from 'js/lib/rgb';
import {selectView} from 'js/actions';

var colours = [
  new RGB(238, 64, 53),
  new RGB(243, 119, 54),
  new RGB(253, 244, 152),
  new RGB(123, 192, 67),
  new RGB(3, 146, 207)
];

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="small-3 columns">
          <NavBar/>
        </div>
        <div className="small-9 columns">
          <MetricContainer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectView: selectView
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(App);
