import React from 'react';
import { connect } from 'react-redux';
import '../styles/leaderboard.css';
import PropTypes from 'prop-types';
import { getLeaderboard, pageReset } from '../actions/leaderboard';
import User from '../components/User';


class Leaderboard extends React.Component {
  static propTypes = {
    pageReset: PropTypes.func.isRequired,
    getLeaderboard: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    allLoaded: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
  }

  async componentDidMount() {
    await this.props.pageReset();
    const { page } = this.props;
    this.props.getLeaderboard(page);
  }


  render() {
    return (
      <div className="leaderboardContainer">
        <div className="leaderboard">
          <div className="label">#</div>
          <div className="label">rating</div>
          <div className="label">nick</div>
          { this.props.users.map((item, index) => (
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
        {!this.props.allLoaded && this.props.users.length > 0
        && <button type="button" onClick={() => this.props.getLeaderboard(this.props.page)}> load more </button>
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.leaderboard.isLoading,
  page: state.leaderboard.page,
  users: state.leaderboard.users,
  allLoaded: state.leaderboard.allLoaded,
});

const mapDispatchToProps = dispatch => ({
  getLeaderboard: page => dispatch(getLeaderboard(page)),
  pageReset: () => dispatch(pageReset()),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
