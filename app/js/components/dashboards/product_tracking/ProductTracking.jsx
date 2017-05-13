import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReleaseBurnup from './ReleaseBurnup';
import OverviewTable from './OverviewTable';

class ProductTracking extends Component {
  render() {
    return (
      <div className="product-tracking-dashboard">
        <h1>Product Tracking</h1>
        <div className="row">
          <div className="medium-9 columns">
            <ReleaseBurnup className="main-visualisation" />
          </div>
          <div className="medium-3 columns">
            <OverviewTable />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProductTracking);
