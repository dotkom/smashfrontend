import React from 'react';
import { connect } from 'react-redux';
import '../styles/matches.css';
import PropTypes from 'prop-types';
import {
  getAllMatches, deleteMatch, pageReset, userDeleteMatch,
} from '../actions/matches';
import Match from '../components/Match';


class Matches extends React.Component {
  static propTypes = {
    pageReset: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    getMatches: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    deleteMatch: PropTypes.func.isRequired,
    userDeleteMatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    allLoaded: PropTypes.bool.isRequired,
    toggleAdmin: PropTypes.bool.isRequired,
  }

  async componentDidMount() {
    await this.props.pageReset();
    this.props.getMatches(this.props.page);
  }

  render() {
    return (
      <div className="matchesPage">
        <div className="matchContainer">
          { this.props.matches.map(item => (
            <Match
              key={item._id}
              id={item._id}
              player1={item.player1}
              oldrank1={item.oldrank1}
              oldrank2={item.oldrank2}
              newrank1={item.newrank1}
              newrank2={item.newrank2}
              player2={item.player2}
              character1={item.character1}
              character2={item.character2}
              winner={item.winner}
              deleteMatch={
                this.props.user.isAdmin ? this.props.deleteMatch : this.props.userDeleteMatch
              }
              date={item.date}
              showDelete={this.props.toggleAdmin
                || (
                  (((new Date()) - new Date(item.date)) < (60 * 60 * 1000))
                  && (item.player1._id === this.props.user._id
                  || item.player2._id === this.props.user._id
                  || item.registeredby === this.props.user._id)
                )
              }
            />
          ))
          }
        </div>
        { !this.props.allLoaded
          && <button type="button" onClick={() => this.props.getMatches(this.props.page)}> Get matches </button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.matches.isLoading,
  user: state.auth.user,
  matches: state.matches.matches,
  page: state.matches.page,
  allLoaded: state.matches.allLoaded,
  toggleAdmin: state.auth.toggleAdmin,
});

const mapDispatchToProps = dispatch => ({
  getMatches: page => dispatch(getAllMatches(page)),
  deleteMatch: id => dispatch(deleteMatch(id)),
  userDeleteMatch: id => dispatch(userDeleteMatch(id)),
  pageReset: () => dispatch(pageReset()),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Matches);
