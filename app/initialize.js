import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from 'js/reducers';
import App from 'js/components/App';

const store = createStore(allReducers);

store.subscribe(() =>
  console.log("Store changed", store.getState())
);

var charts =
  document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.querySelector('#app')
      );
  });
 
