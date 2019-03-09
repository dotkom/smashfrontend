import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import '../styles/profile.css';
import PropTypes from 'prop-types';
import RouterPropTypes from 'react-router-prop-types';
import { getMatches, deleteMatch, pageReset } from '../actions/matches';
import { getUser, resetProfile } from '../actions/profile';
import { changeNick } from '../actions/auth';
import Match from '../components/Match';


class Profile extends React.Component {
  static propTypes = {
    pageReset: PropTypes.func.isRequired,
    resetProfile: PropTypes.func.isRequired,
    match: RouterPropTypes.match.isRequired,
    user: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
    changeNick: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    allLoaded: PropTypes.bool.isRequired,
    toggleAdmin: PropTypes.bool.isRequired,
    delete: PropTypes.bool.isRequired,
  };

  async componentDidMount() {
    await this.props.pageReset();
    await this.props.resetProfile();
    let id;
    const urlid = this.props.match.params.id;
    if (urlid && urlid.length === 24) {
      id = urlid;
    } else {
      id = this.props.user._id;
    }
    this.id = id;
    this.props.getProfile(id);
    this.props.getMatches(id, this.props.page);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const { id } = nextProps.match.params;
      await this.props.pageReset();
      const { page } = nextProps;
      this.props.getProfile(id);
      this.props.getMatches(id, page);
    }
  }


  render() {
    return (
      <div className="profileContainer">
        {this.props.profile
        && (
        <div>
          <div className="profileNick">{this.props.profile.nick}</div>

          <div className="statistics">
            <div>Rank</div>
            <div>Rating</div>
            <div>Matches</div>
            <div>Wins</div>
            <div>{this.props.profile.rank}</div>
            <div>{this.props.profile.rating && Math.round(this.props.profile.rating)}</div>
            <div>{this.props.profile.matches}</div>
            <div>{this.props.profile.wins}</div>

          </div>
          {this.props.user && this.props.profile._id === this.props.user._id
          && (
          <div className="changeNick">
            <input className="nickInput" />
            <button
              type="button"
              onClick={
              () => this.props.changeNick(document.querySelectorAll('.nickInput')[0].value)}
            >
              {' '}
Change nick
            </button>
          </div>
          )
        }
        </div>
        )
     }
        <div className="matchContainer">
          { this.props.matches.map(item => (
            <Match
              key={item._id}
              id={item._id}
              oldrank1={item.oldrank1}
              oldrank2={item.oldrank2}
              newrank1={item.newrank1}
              newrank2={item.newrank2}
              showAdmin={(this.props.toggleAdmin && this.props.user && this.props.user.isAdmin)}
              player1={item.player1}
              player2={item.player2}
              character1={item.character1}
              character2={item.character2}
              winner={item.winner}
              deleteMatch={this.props.delete}
              date={item.date}
            />
          ))
          }
        </div>
        { !this.props.allLoaded && this.props.matches.length > 0
          && <button type="button" onClick={() => getMatches(this.id, this.props.page)}> Get matches </button>
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
  profile: state.profile.user,
  profileError: state.profile.errorMessage,
  toggleAdmin: state.auth.toggleAdmin,
});

const mapDispatchToProps = dispatch => ({
  pageReset: () => dispatch(pageReset()),
  getMatches: (id, page) => dispatch(getMatches(id, page)),
  toHome: () => dispatch(push('/')),
  delete: id => dispatch(deleteMatch(id)),
  getProfile: id => dispatch(getUser(id)),
  resetProfile: () => dispatch(resetProfile()),
  changeNick: string => dispatch(changeNick(string)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
