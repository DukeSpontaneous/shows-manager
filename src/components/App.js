import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Shows } from "./containers"
import './App.css'

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/watched/1" />
      <Route path="/:sort/:page" component={Shows} />
    </Switch>
  )
}

export default App