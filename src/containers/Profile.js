import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { getMatches } from '../actions/matches';


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
      { this.props.matches &&
        this.props.matches.map((item) =>
        <div key={item._id}> {JSON.stringify(item)} </div>
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
