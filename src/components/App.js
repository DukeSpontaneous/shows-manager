import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Pagination from './ui/Pagination'
import Whoops404 from './ui/Whoops404'
import { Shows } from "./containers"
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Redirect exact from="/" to="/watched/1" />
        <Route path="/:sort/:page" component={Shows} />
        <Route component={Whoops404} />
      </Switch>
      <Pagination />
    </div>
  )
}

export default App