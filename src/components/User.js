import React from 'react';
import '../styles/match.css';


class User extends React.Component {


  render(){
    return(
      <div className="userContainer">
        <div> {this.props.number} </div>
        <div> {this.props.rating} </div>
        <div> {this.props.nick} </div>
        <div> </div>

      </div>
    )
  }
}




export default User
