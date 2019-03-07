import React from 'react';
import '../styles/user.css';


class User extends React.Component {


  render(){
    return(
      <div className="user">
        <div className="number"> {this.props.number} </div>
        <div className="rating"> {Math.round(this.props.rating)} </div>
        <div className="nick"> {this.props.nick} </div>
        <div> </div>

      </div>
    )
  }
}




export default User
