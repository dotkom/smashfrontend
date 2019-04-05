import { Route, Switch, Redirect } from 'react-router-dom';
import './styles/App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import RouterPropTypes from 'react-router-prop-types';
import Profile from './containers/Profile';
import Navbar from './components/Navbar';
import Matches from './containers/Matches';
import Home from './containers/Home';
import RegisterMatches from './containers/RegisterMatches';
import Leaderboard from './containers/Leaderboard';
import { postCurrent } from './actions/auth';
import { getCharacters } from './actions/characters';

class App extends React.Component {
  static propTypes = {
    postCurrent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: RouterPropTypes.history.isRequired,
    currentUserLoading: PropTypes.bool.isRequired,
    getCharacters: PropTypes.func.isRequired,

  }


  async componentWillMount() {
    await this.props.getCharacters();
    this.props.postCurrent();
  }


  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Navbar />
          <div className="mainContainer">
            {this.props.currentUserLoading ? (
              <div> Loading </div>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/matches" component={Matches} />
                <PrivateRoute authed={this.props.user} exact path="/registermatch" component={RegisterMatches} />
                <PrivateRoute exact path="/profile" authed={this.props.user} component={Profile} />
                <Route path="/profile/:id" component={Profile} />

              </Switch>
            )}
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}


function PrivateRoute({
  component: Component, authed, admin, ...rest
}) {
  return (
    <Route
      {...rest}
      render={
        props => (admin ? (admin.isAdmin ? <Component {...props} />
          : <Redirect to={{ pathname: '/' }} />)
          : (authed._id
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/leaderboard' }} />))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.any,
  admin: PropTypes.any,
};

PrivateRoute.defaultProps = {
  authed: false,
  admin: false,
};


const mapStateToProps = state => ({
  user: state.auth.user,
  currentUserLoading: state.auth.initialLoading,
});

const mapDispatchToProps = dispatch => ({
  postCurrent: () => dispatch(postCurrent()),
  getCharacters: () => dispatch(getCharacters()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
