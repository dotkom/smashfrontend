import { Route, Switch, Redirect } from "react-router-dom";
import './styles/App.css';
import Test from './components/Test'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import Admin from './containers/Admin'
import Matches from './containers/Matches'
import RegisterMatches from './containers/RegisterMatches'
import Leaderboard from './containers/Leaderboard'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postCurrent } from './actions/auth'
import { ConnectedRouter } from 'connected-react-router'

class App extends React.Component {

  componentWillMount(){
    this.props.postCurrent()
  }


  render() {
  return (
    <ConnectedRouter history={this.props.history}>
        <div>
          <Navbar />
            <div className="mainContainer">
            <Switch>
              <Route exact path="/" component={Test} />
              <Route exact path ="/leaderboard" component={Leaderboard} />
              <Route exact path ="/matches" component={Matches} />
              <Route exact path ="/registermatch" component={RegisterMatches} />
              <PrivateRoute exact path ="/profile" authed={this.props.user} component={Profile} />
              <PrivateRoute exact path ="/admin" admin={this.props.user} component={Admin} />
              <Route path = "/profile/" component={Test} />

            </Switch>
            </div>
        </div>
    </ConnectedRouter>
  )
}
}

App.propTypes = {
  history: PropTypes.object,
}

function PrivateRoute ({component: Component, authed, admin, ...rest}) {
  return (
    <Route
      {...rest}
      render={
        (props) => admin ? (admin.isAdmin ? <Component {...props} />
        : <Redirect to={{pathname: '/'}} />) :
        (authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/'}} />)}
    />
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCurrent: () => dispatch(postCurrent())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
