import React from 'react';
import { connect } from 'react-redux';
import '../styles/matches.css';
import PropTypes from 'prop-types';
import {
  getAllMatches, pageReset,
} from '../actions/matches';
import MatchContainer from '../components/MatchContainer';


class Matches extends React.Component {
  static propTypes = {
    pageReset: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    getMatches: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    allLoaded: PropTypes.bool.isRequired,
  }

  async componentDidMount() {
    await this.props.pageReset();
    this.props.getMatches(this.props.page);
  }

  render() {
    return (
      <div className="matchesPage">
        <MatchContainer />
        { !this.props.allLoaded && this.props.matches.length > 0
          && <button type="button" onClick={() => this.props.getMatches(this.props.page)}> Load more </button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.matches.isLoading,
  matches: state.matches.matches,
  page: state.matches.page,
  allLoaded: state.matches.allLoaded,
});

const mapDispatchToProps = dispatch => ({
  getMatches: page => dispatch(getAllMatches(page)),
  pageReset: () => dispatch(pageReset()),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Matches);
