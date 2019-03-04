import React from 'react';
import { connect } from 'react-redux'
import { registerUser, resetError } from '../actions/auth';
import ErrorMessage from '../components/ErrorMessage'
import '../styles/register.css'
import '../styles/authform.css'



class Register extends React.Component {

  componentWillMount() {
    this.props.resetError()
  }

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
          <input className="userInput" type="text" placeholder="name" required="required" />
          <input className="userInput" type="text" placeholder="smash nick" required="required" />
          <input className="userInput" type="email" placeholder="email" required="required" />
          <input className="userInput" type="password" placeholder="password" required="required" />
          <input className="userInput" type="password" placeholder="confirm password" required="required" />
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
    resetError: () => dispatch(resetError())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
