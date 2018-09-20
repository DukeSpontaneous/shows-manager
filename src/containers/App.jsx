import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import { HashRouter } from 'react-router-dom'

import Whoops404 from '../components/Whoops404'
import ModalLoader from '../components/ModalLoader'

import ShowDescription from './ShowDescription'
import ShowsSearch from './ShowsSearch'
import RoutePagination from './RoutePagination'
import SortedShowsTable from './Tables/SortedShowsTable'
import QueryShowsTable from './Tables/QueryShowsTable'

import { app } from './app.css'

const App = ({ inProgress }) =>
  <HashRouter>
    <div className={app}>
      <header>
        <h1>Trakt.tv Shows</h1>
      </header>
      <main>
        <div>
          <ShowsSearch />
          <Switch>
            <Redirect exact from="/" to="/shows/watched/1" />
            <Redirect exact from='/shows/:sort' to='/shows/:sort/1' />
            <Route path="/shows/:sort/:page" component={SortedShowsTable} />
            <Route path="/search/:query/:page" component={QueryShowsTable} />
            <Route component={Whoops404} />
          </Switch>
          <Route path="/:ptr1/:ptr2/:page/" component={RoutePagination} />
          {inProgress ? <ModalLoader /> : <Route path="/:ptr1/:ptr2/:ptr3/:rowId" component={ShowDescription} />}
        </div>
      </main>
    </div>
  </HashRouter>

App.propTypes = {
  inProgress: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ shows }) => ({
  inProgress: shows.inProgress
})

export default connect(
  mapStateToProps
)(App)