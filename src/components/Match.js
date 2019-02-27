import React from 'react';


class Match extends React.Component {

  constructor(){
    super()
  }

  componentDidMount() {
  }



  render(){
    return(
      <div className="matchContainer">
        <div className={"player " + (this.props.winner==this.props.player1 ? "winner" : "loser")}>
          <div className="nick">
            {this.props.player1.nick}
          </div>
          <div className="character">
            {this.props.character1.name}
          </div>
        </div>
        <div className={"player " + (this.props.winner==this.props.player2 ? "winner" : "loser")}>
          <div className="nick">
            {this.props.player2.nick}
          </div>
          <div className="character">
            {this.props.character2.name}
          </div>
        </div>
        {this.props.isAdmin &&
          <div className="matchButton"> Delete </div>
        }
      </div>
    )
  }
}




export default Match
