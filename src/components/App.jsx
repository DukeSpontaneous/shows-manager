import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import ShowDescription from './ShowDescription'
import ShowInterface from './ShowInterface'
import Whoops404 from './Whoops404'

import { app } from './app.css'

import storeFactory from '../store'

const store = storeFactory()

const App = () =>
  <Provider store={store}>
    <HashRouter>
      <div className={app}>
        <header>
          <h1>Trakt.tv Shows</h1>
        </header>
        <main>
          <div>
            <Switch>
              <Redirect exact from="/" to="/shows/watched/1" />
              <Route path="/:category/:ptr/:page" component={ShowInterface} />
              <Route component={Whoops404} />
            </Switch>
            <Route path="/:category/:ptr/:page/:rowId" component={ShowDescription} />
          </div>
        </main>
      </div>
    </HashRouter>
  </Provider>

export default App