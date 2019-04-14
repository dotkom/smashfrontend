import React from 'react';
import '../styles/stats.css';
import API_ADDRESS from '../config/connections';
import CharacterPicker from '../components/CharacterPicker';


const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.changeCharacter = this.changeCharacter.bind(this);
    this.state = {
      mostPlayed: [],
      winRates: [],
      chosenCharacter: 0,
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


  changeCharacter(character) {
    this.setState({
      chosenCharacter: character,
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
          <div className="mostPlayedStats">
            <div className="title"> The most popular characters </div>
            <div className="characters">
              {this.state.mostPlayed
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map(char => (
                  <div className="char" key={char.id}>
                    <img alt="char" src={`/icons/characters/${char.id}.png`} />
                    <div className="count">{char.count}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mostPlayedStats">
            <div className="title"> Highest winrates </div>
            <div className="characters">
              {this.state.mostPlayed
                .sort((a, b) => b.wins / b.count - a.wins / a.count)
                .slice(0, 5)
                .map(char => (
                  <div className="char" key={char.id}>
                    <img alt="char" src={`/icons/characters/${char.id}.png`} />
                    <div className="count">
                      {`${((char.wins / char.count) * 100).toFixed(2)}%`}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <CharacterPicker
          setCharacter={this.changeCharacter}
          currentCharacter={this.state.chosenCharacter}
          localitem="statscharacter"
        />
      </div>
    );
  }
}


export default Stats;
