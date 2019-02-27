import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { getMatches } from '../actions/matches';
import Match from '../components/Match'


class Profile extends React.Component {

  constructor(){
    super()
  }

  componentDidMount() {
    let id = this.props.user._id
    let page = this.props.page
    this.props.getMatches(id,page)
  }



  render(){
    return(
      <div className="profileContainer">
      { (this.props.matches) ? (
          this.props.matches.map((item) =>
          <Match
            key={item._id}
            isAdmin={this.props.user.isAdmin}
            player1={item.player1}
            player2={item.player2}
            character1={item.character1}
            character2={item.character2}
            winner={item.winner}
          />
        )
      ) : (
        <div> There are no matches </div>
      )
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.matches.isLoading,
    hasErrored: state.matches.hasErrored,
    user: state.auth.user,
    matches: state.matches.matches,
    page: state.matches.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatches: (id, page) => dispatch(getMatches(id, page)),
    toHome: () => dispatch(push('/'))


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
