import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Whoops404 from './ui/Whoops404'
import { Shows, Show, Pages } from "./containers"
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
          <Route path="/:sort/:page" component={Shows} />
          <Route component={Whoops404} />
        </Switch>
        <Route path="/:sort/:page" component={Pages} />
        <Route path="/:sort/:page/:show" component={Show} />
      </div>
    </main>
  </div>

export default App