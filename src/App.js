import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Test from './components/Test'
import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route exact path="/" component={Test} />
        </Switch>
      </Router>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
