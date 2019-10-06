import React from 'react';
import '../styles/characterstatcontainer.css';
import PropTypes from 'prop-types';
import API_ADDRESS from '../config/connections';
import CharacterStat from './CharacterStat';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;


class CharacterStatContainer extends React.Component {
  static propTypes = {
    character: PropTypes.string.isRequired,

  }

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
    this.getStats(this.props.character);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.character !== this.props.character) {
      this.getStats(nextProps.character);
    }
  }

  getStats(id) {
    axios.get(`${API_ADDRESS}/character/winrates/id/${id}`)
      .then(response => response.data)
      .then((characters) => {
        this.setState({
          characters,
        });
      })
      .catch((err) => {
      });
  }


  render() {
    return (
      <div className="charStatContainer">
        {this.state.characters
          .sort((a, b) => b.wins / b.count - a.wins / a.count)
          .map(char => (
            <CharacterStat key={char.id} char={char} />
          ))}
      </div>
    );
  }
}


export default CharacterStatContainer;
