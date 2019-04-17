import React from 'react';
import '../styles/stats.css';
import API_ADDRESS from '../config/connections';
import CharacterPicker from '../components/CharacterPicker';
import CharacterStatContainer from '../components/CharacterStatContainer';
import MultiCharStat from '../components/MultiCharStat';


const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.changeCharacter = this.changeCharacter.bind(this);
    this.state = {
      mostPlayed: [],
      chosenCharacter: 0,
      chosenCharacterID: null,
      errorMessage: '',
    };
    this.getMostPlayed();
  }

  getMostPlayed() {
    axios.get(`${API_ADDRESS}/character/stats`)
      .then(response => response.data)
      .then((mostPlayed) => {
        this.setState({
          mostPlayed,
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }


  changeCharacter(character, id) {
    this.setState({
      chosenCharacter: character,
      chosenCharacterID: id,
    });
  }


  render() {
    return (
      <div className="statsPage">
        <div className="errorMessage">
          {' '}
          {this.state.errorMessage}
          {' '}
        </div>
        <div className="stats">
          <MultiCharStat
            size={5}
            sortFunc={(a, b) => b.count - a.count}
            characters={this.state.mostPlayed}
            title="Most popular characters"
          />
          <MultiCharStat
            size={5}
            sortFunc={(a, b) => b.wins / b.count - a.wins / a.count}
            characters={this.state.mostPlayed}
            title="Highest win rates"
            winrate
          />
        </div>
        <div className="characterInfo">
          <div>
        Win rate for
          </div>
          <div className="pickerContainer">
            <CharacterPicker
              setCharacter={this.changeCharacter}
              currentCharacter={this.state.chosenCharacter}
              localitem="statscharacter"
            />
          </div>
          <div>
          against other characters:
          </div>
        </div>
        { this.state.chosenCharacterID && (
          <CharacterStatContainer character={this.state.chosenCharacterID} />

        )}
      </div>
    );
  }
}


export default Stats;
