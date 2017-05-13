import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import StatusIndicator from '../../StatusIndicator';

class ProductTracking extends Component {
  render() {
    return (
      <div className="product-tracking-dashboard">
        <h1>Product Tracking</h1>
        <div className="row">
          <div className="medium-10 columns">
            <ReleaseBurnup className="main-visualisation" />
          </div>
          <div className="medium-2 columns">
            <StatusIndicator value="GREEN" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductTracking);
