import { Route, Switch, Redirect } from "react-router-dom";
import './styles/App.css';
import Test from './components/Test'
import Login from './containers/Login'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postCurrent } from './actions/auth'
import { ConnectedRouter } from 'connected-react-router'

class App extends React.Component {
  constructor(){
    super();
  }

  componentWillMount(){
    this.props.postCurrent()
  }


  render() {
  return (
    <ConnectedRouter history={this.props.history}>
        <div>
          <Navbar />
          { this.props.isLoading ? (
            <div> loading... </div>
          ) : (
            <Switch>
              <Route exact path="/" component={Test} />
              <Route exact path ="/login" component={Login} />
              <PrivateRoute exact path ="/profile" authed={this.props.user} component={Profile} />
              <Route path = "/profile/" component={Test} />

            </Switch>
          )
          }
        </div>
    </ConnectedRouter>
  )
}
}

App.propTypes = {
  history: PropTypes.object,
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/'}} />}
    />
  )
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    hasErrored: state.auth.hasErrored,
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
