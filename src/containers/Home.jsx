import React from 'react';
import { connect } from 'react-redux';
import '../styles/home.css';
import PropTypes from 'prop-types';
import { getTinyLeaderboard, pageReset } from '../actions/leaderboard';
import { pageReset as matchReset, getTinyMatches } from '../actions/matches';
import { getAllStats, statsReset } from '../actions/stats';
import MatchContainer from '../components/MatchContainer';
import User from '../components/User';


class Home extends React.Component {
  static propTypes = {
    getLeaderboard: PropTypes.func.isRequired,
    leaderboardReset: PropTypes.func.isRequired,
    getStats: PropTypes.func.isRequired,
    matchReset: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    leaderboard: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired,
    statsReset: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    await this.props.leaderboardReset();
    await this.props.matchReset();
    this.props.getStats();
    this.props.getLeaderboard();
    this.props.getMatches();
  }

  async componentWillUnmount() {
    await this.props.leaderboardReset();
    await this.props.matchReset();
    await this.props.statsReset();
  }


  render() {
    return (
      <div className="homeContainer">
        {this.props.user._id
        && (
          <div className="welcome">
            Welcome
            {' '}
            {this.props.user.nick}
            ! Here&#39;s a short summary of what is going on
          </div>
        )}
        <div className="summary">
          <div className="tinyLeaderboardContainer">
            <div className="title">
              Top 5 leaderboard
            </div>
            <div className="tinyLeaderboard">
              <div className="label">#</div>
              <div className="label">rating</div>
              <div className="label">nick</div>
              { this.props.leaderboard.map((item, index) => (
                <User
                  key={item._id}
                  number={index + 1}
                  nick={item.nick}
                  id={item._id}
                  rating={item.rating}
                />
              ))
            }
            </div>
          </div>
          <span>
            <div className="allCharStats">
              <div className="title"> The most popular characters </div>
              <div className="characters">
                {this.props.stats.slice(0, 5).map(char => (
                  <div className="char" key={char.id}>
                    <img alt="char" src={`/icons/characters/${char.id}.png`} />
                    <div className="count">{char.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </span>
        </div>
        <div className="tiny matches">
          <div className="title">
                Last 5 matches
          </div>
          <MatchContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboard.users,
  user: state.auth.user,
  stats: state.stats.stats,
});

const mapDispatchToProps = dispatch => ({
  getLeaderboard: () => dispatch(getTinyLeaderboard()),
  leaderboardReset: () => dispatch(pageReset()),
  getStats: () => dispatch(getAllStats()),
  matchReset: () => dispatch(matchReset()),
  getMatches: () => dispatch(getTinyMatches()),
  statsReset: () => dispatch(statsReset()),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
