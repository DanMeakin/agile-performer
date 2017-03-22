import { combineReducers } from 'redux';
import metricsReducer from './metrics_reducer';

const allReducers = combineReducers({
  metrics: metricsReducer
});

export default allReducers;
