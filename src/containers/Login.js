import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { postUser } from '../actions/auth';
import ErrorMessage from '../components/ErrorMessage'
import '../styles/login.css'
import '../styles/authform.css'


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
      <div className="loginContainer">
        <div className="authform" >
          <input className="userInput" type="text" placeholder="Brukernavn" required="required" />
          <input className="userInput" type="password" placeholder="Passord" required="required" />
          <button className="button" onClick={this.handleSubmit}><div className="buttontext">Login</div></button>
          <button className="button gray" onClick={this.props.gotoforgot}><div className="buttontext">Forgot password</div></button>
        </div>
        <ErrorMessage/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
