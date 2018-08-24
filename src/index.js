import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import storeFactory from './store'

const store = storeFactory()

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
