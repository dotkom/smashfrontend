import React from 'react';
import { connect } from 'react-redux'
import { registerUser } from '../actions/auth';
import ErrorMessage from '../components/ErrorMessage'
import '../styles/register.css'
import '../styles/authform.css'



class Register extends React.Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    const userValue = document.querySelectorAll('.userInput');
    if (userValue[0].value && userValue[1].value && userValue[2].value && userValue[3].value && userValue[4].value) {
      this.props.registerUser(userValue[0].value, userValue[1].value, userValue[2].value, userValue[3].value, userValue[4].value);
    }
  }

  render(){
    return(
      <div className="registerContainer">
        <div className="authform" >
          <input className="userInput" type="text" placeholder="Name" required="required" />
          <input className="userInput" type="text" placeholder="Smash nick" required="required" />
          <input className="userInput" type="email" placeholder="Email" required="required" />
          <input className="userInput" type="password" placeholder="Password" required="required" />
          <input className="userInput" type="password" placeholder="Confirm password" required="required" />
          <button className="button" onClick={this.handleSubmit}><div className="buttontext">Register</div></button>
        </div>
          <ErrorMessage/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (name, nick, email, password, password2) => dispatch(registerUser(name, nick, email, password, password2)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
