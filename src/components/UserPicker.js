import React from 'react';
import { connect } from 'react-redux'
import '../styles/userpicker.css';


class UserPicker extends React.Component {

  constructor(props){
    super(props)
    this.setPlayer = this.setPlayer.bind(this);
    let localplayer = localStorage.getItem(this.props.localitem)
    if(localplayer){
      this.setPlayer(localplayer)
    }
  }

  componentWillUnmount() {

  }



  setPlayer(id) {
    this.props.setPlayer(id)
  }




  render(){
    return(
      <div className="userPicker">
        <input placeholder={this.props.placeholder} type="text" value={this.props.player} onChange={(event) => this.setPlayer(event.target.value)} />
        <div className="scrollerContainer">
          <div className="userScroller">
            { this.props.users.filter((user) => {
              if (this.props.player == "") {
                localStorage.setItem(this.props.localitem, "")
              }
              if (user.nick ==this.props.player) {
                localStorage.setItem(this.props.localitem, user.nick)
                return 0
              }
              return user.nick.includes(this.props.player)

            })
            .sort((a,b) => {
              return ('' + a.nick).localeCompare(b.nick)
            })
            .map((user) => (
              <button key={user._id} onClick={() => this.setPlayer(user.nick)}> {user.nick} </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPicker)
