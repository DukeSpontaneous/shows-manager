import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Pagination from './Pagination'
import ShowDescription from './ShowDescription'
import ShowTable from './ShowTable'
import Whoops404 from './Whoops404'

import { app } from './app.css'

const App = () =>
  <div className={app}>
    <header>
      <h1>Trakt.tv</h1>
    </header>
    <main>
      <div>
        <Switch>
          <Redirect exact from="/" to="/watched/1" />
          <Route path="/:sort/:page" component={ShowTable} />
          <Route component={Whoops404} />
        </Switch>
        <Route path="/:sort/:page" component={Pagination} />
        <Route path="/:sort/:page/:rowId" component={ShowDescription} />
      </div>
    </main>
  </div>

export default App