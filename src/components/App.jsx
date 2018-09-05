import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ShowTable from './ui/ShowTable'
import ShowDescription from './ui/ShowDescription'
import Pagination from './ui/Pagination'
import Whoops404 from './ui/Whoops404'

import { app } from './app.css'

const App = () =>
  <div className={app}>
    <header>
      <h1>TV Shows</h1>
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