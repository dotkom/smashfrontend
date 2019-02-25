import { Route, Switch } from "react-router-dom";
import './styles/App.css';
import Test from './components/Test'
import Login from './containers/Login'
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

  componentDidMount(){
    this.props.postCurrent()
  }


  render() {
  return (
    <ConnectedRouter history={this.props.history}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Test} />
            <Route exact path ="/login" component={Login} />
          </Switch>
        </div>
    </ConnectedRouter>
  )
}
}

App.propTypes = {
  history: PropTypes.object,
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
