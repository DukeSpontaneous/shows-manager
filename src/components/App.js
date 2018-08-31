import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Whoops404 from './ui/Whoops404'
import { Shows, Pages } from "./containers"
import './app.css'

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Redirect exact from="/" to="/watched/1" />
        <Route path="/:sort/:page" component={Shows} />
        <Route component={Whoops404} />
      </Switch>
      <Route path="/:sort/:page" component={Pages} />
    </div>
  )
}

export default App