import React from 'react';
import '../styles/matchplayer.css';
import { Link } from 'react-router-dom'


class MatchPlayer extends React.Component {





  render(){
    return(
      <div className={(this.props.reverse ? "reverse " : "") +"matchPlayer " + (this.props.isWinner ? "winner" : "loser")}>

        <div className="iconContainer">
          <img alt="icon" src={`/icons/characters/${this.props.icon}.png`}/>
        </div>
        <div className="information">
          <div/>
          <div className="nick">
            <Link to={"/profile/"+this.props.id}>{this.props.nick}</Link>
          </div>
          <div className="rating">
            {Math.round(this.props.oldrank) + "->"+Math.round(this.props.newrank)}
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
