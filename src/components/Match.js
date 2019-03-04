import React from 'react';
import '../styles/match.css';
import MatchPlayer from './MatchPlayer'


class Match extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.delete = this.delete.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);

  }

  closeModal() {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.setState({
      modalOpen: false
    });
  }

  delete(id) {
    this.props.deleteMatch(this.props.id)

  }

  openModal() {
    document.addEventListener('click', this.handleOutsideClick, false);
    this.setState({
      modalOpen: true
    })
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.closeModal();
  }



  render(){
    return(
      <div className="matchWrapper">
        <div className="outerComponent">
          {this.props.winner === this.props.player1._id &&
            <div className="badgetext left">
              winner
            </div>
          }
          <div className={"matchComponent "+(this.props.winner===this.props.player1._id ? "left" : "right")}>
            <div className="matchInformation">
              <MatchPlayer
                isWinner={this.props.winner===this.props.player1._id}
                icon={this.props.character1.id}
                nick={this.props.player1.nick}
                character={this.props.character1.name}
              />
              <div className="center">
                <span>
                 <div className="vs">VS</div>
                 <div className="date"> February 20. 2019 </div>
                </span>
               </div>
              <MatchPlayer
                reverse={true}
                isWinner={this.props.winner===this.props.player2._id}
                icon={this.props.character2.id}
                nick={this.props.player2.nick}
                character={this.props.character2.name}
              />
            </div>


          </div>
          {this.props.winner === this.props.player2._id &&
            <div className="badgetext right">
              winner
            </div>
          }

        </div>
        {this.props.showAdmin &&
          <div className="adminPanel" ref={node => { this.node = node; }}>
            <button className="deleteButton" onClick={this.modalOpen ? this.closeModal : this.openModal}> Delete </button>
            {this.state.modalOpen &&
              <div className="matchModal">
                <div> Are you sure? </div>
                <div className="buttons">
                  <button className="deleteButton" onClick={this.delete}> Yes </button>
                  <button className="deleteButton" onClick={this.closeModal}> No </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}




export default Match