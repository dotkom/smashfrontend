import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/matches.css';
import { getAllMatches, deleteMatch, pageReset } from '../actions/matches';
import Match from '../components/Match'



class Matches extends React.Component {



  async componentDidMount() {
    await this.props.pageReset()
    let page = this.props.page
    this.props.getMatches(page)
  }



  render(){
    return(
      <div className="matchesPage">
        <div className="matchContainer">
          { this.props.matches.map((item) =>(
              <Match
                key={item._id}
                id={item._id}
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
        { !this.props.allLoaded &&
          <button onClick={() => this.props.getMatches(this.props.page)}> Get matches </button>
        }
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
    allLoaded: state.matches.allLoaded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatches: (page) => dispatch(getAllMatches(page)),
    deleteMatch: (id) => dispatch(deleteMatch(id)),
    pageReset: () => dispatch(pageReset())


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)
