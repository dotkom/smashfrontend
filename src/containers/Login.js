import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { postUser } from '../actions/auth';


class Login extends React.Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    const userValue = document.querySelectorAll('.userInput');
    if (userValue[0].value && userValue[1].value.length > 4) {
      this.props.postUser(userValue[0].value, userValue[1].value);
    }
  }

  current(){
    this.props.postCurrent()
  }

  render(){
    return(
      <div>
        <div name="login" className="loginContainer" >
          <input className="userInput" type="text" placeholder="Brukernavn" required="required" />
          <input className="userInput" type="password" placeholder="Passord" required="required" />
          <button className="button" onClick={this.handleSubmit}><div className="buttontext">Logg inn</div></button>
          <button className="button" onClick={this.props.gotoforgot}><div className="buttontext">forgot</div></button>
        </div>
      </div>
    )
  }
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
    postUser: (username, password) => dispatch(postUser(username, password)),
    gotoforgot: () => dispatch(push('/forgot'))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
