import { combineReducers } from 'redux';
import metricsReducer from './metrics_reducer';
import menuReducer from './menu_reducer';

const allReducers = combineReducers({
  metrics: metricsReducer,
  menuItems: menuReducer
});

export default allReducers;
