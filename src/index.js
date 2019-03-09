import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore, { history } from './store';

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </div>,
    document.getElementById('root'),
  );
};

render();
