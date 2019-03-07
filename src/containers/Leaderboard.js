import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/leaderboard.css';
import { getLeaderboard, pageReset } from '../actions/leaderboard';
import User from '../components/User'



class Leaderboard extends React.Component {



  async componentDidMount() {
    await this.props.pageReset()
    let page = this.props.page
    this.props.getLeaderboard(page)
  }



  render(){
    return(
      <div className="leaderboardContainer">
        <div className="labels">
          <div>#</div>
          <div>rating</div>
          <div>nick</div>
        </div>
        <div className="userContainer">
        { this.props.users.map((item, index) =>(
            <User
              key={item._id}
              number={index+1}
              nick={item.nick}
              id={item._id}
              rating={item.rating}


            />
          ))
        }
        </div>
        {!this.props.allLoaded &&
        <button onClick={() => this.props.getLeaderboard(this.props.page)}> load more </button>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.leaderboard.isLoading,
    page: state.leaderboard.page,
    users: state.leaderboard.users,
    allLoaded: state.leaderboard.allLoaded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaderboard: (page) => dispatch(getLeaderboard(page)),
    pageReset: () => dispatch(pageReset())


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard)
