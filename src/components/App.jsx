import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ShowDescription from './ShowDescription'
import ShowTable from './ShowTable'
import Whoops404 from './Whoops404'

import { app } from './app.css'

const App = () =>
  <div className={app}>
    <header>
      <h1>Trakt.tv Shows</h1>
    </header>
    <main>
      <div>
        <Switch>
          <Redirect exact from="/" to="/shows/watched/1" />
          <Route path="/:category/:ptr/:page" component={ShowTable} />
          <Route component={Whoops404} />
        </Switch>
        <Route path="/:category/:ptr/:page/:rowId" component={ShowDescription} />
      </div>
    </main>
  </div>

export default App