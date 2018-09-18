import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import { HashRouter } from 'react-router-dom'

import ShowsInterface from './ShowsInterface'
import ShowDescription from '../components/ShowDescription'
import Whoops404 from '../components/Whoops404'
import ModalLoader from '../components/ModalLoader'

import { app } from './app.css'

const App = ({ inProgress }) =>
  <HashRouter>
    <div className={app}>
      <header>
        <h1>Trakt.tv Shows</h1>
      </header>
      <main>
        <div>
          <Switch>
            <Redirect exact from="/" to="/shows/watched/1" />
            <Route path="/:category/:ptr/:page" component={ShowsInterface} />
            <Route component={Whoops404} />
          </Switch>
          <Route path="/:category/:ptr/:page/:rowId" component={ShowDescription} />
          {inProgress && <ModalLoader />}
        </div>
      </main>
    </div>
  </HashRouter>

export default connect(
  ({ shows }) => ({
    inProgress: shows.inProgress
  }),
)(App)