import React from 'react';
import '../styles/matchplayer.css';


class MatchPlayer extends React.Component {





  render(){
    return(
      <div className={(this.props.reverse ? "reverse " : "") +"matchPlayer " + (this.props.isWinner ? "winner" : "loser")}>

        <div className="iconContainer">
          <img src={`/icons/characters/${this.props.icon}.png`}/>
        </div>
        <div className="information">
          <div className="nick">
            {this.props.nick}
          </div>
          {/*<div className="character">
            {this.props.character}
          </div>*/}
        </div>
      </div>
    )
  }
}




export default MatchPlayer
