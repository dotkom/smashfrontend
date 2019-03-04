import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/profile.css';
import { getMatches, deleteMatch, pageReset } from '../actions/matches';
import Match from '../components/Match'



class Leaderboard extends React.Component {



  componentDidMount() {
    this.props.pageReset()
    let id = this.props.user._id
    let page = this.props.page
    this.props.getMatches(page)
  }



  render(){
    return(
      <div className="leaderboardContainer">
        <div className="userContainer">
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.leaderboard.isLoading,
    user: state.auth.user,
    page: state.leaderboard.page,
    users: state.leaderboard.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard)
