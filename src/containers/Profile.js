import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/profile.css';
import { getMatches, deleteMatch, pageReset } from '../actions/matches';
import Match from '../components/Match'



class Profile extends React.Component {



  componentDidMount() {
    this.props.pageReset()
    let id = this.props.user._id
    let page = this.props.page
    this.props.getMatches(id,page)
  }



  render(){
    return(
      <div className="profileContainer">
        <div className="matchContainer">
          { this.props.matches.map((item) =>(
              <Match
                key={item._id}
                id={item._id}
                showAdmin={false}
                player1={item.player1}
                player2={item.player2}
                character1={item.character1}
                character2={item.character2}
                winner={item.winner}
                deleteMatch={this.props.deleteMatch}
                date={item.date}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.matches.isLoading,
    user: state.auth.user,
    matches: state.matches.matches,
    page: state.matches.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageReset: () => dispatch(pageReset()),
    getMatches: (id, page) => dispatch(getMatches(id, page)),
    toHome: () => dispatch(push('/')),
    deleteMatch: (id) => dispatch(deleteMatch(id))


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
