import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'
import App from './components/App/App.js';
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <main>
      <App />
    </main>
  </Provider>,
  document.getElementById('root')
);
