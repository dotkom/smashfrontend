import React from 'react';


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
      <div className="matchContainer">
        <div className={"player " + (this.props.winner===this.props.player1 ? "winner" : "loser")}>
          <div className="nick">
            {this.props.player1.nick}
          </div>
          <div className="character">
            {this.props.character1.name}
          </div>
        </div>
        <div className={"player " + (this.props.winner===this.props.player2 ? "winner" : "loser")}>
          <div className="nick">
            {this.props.player2.nick}
          </div>
          <div className="character">
            {this.props.character2.name}
          </div>
        </div>
        {this.props.isAdmin &&
          <div ref={node => { this.node = node; }}>
            <button className="deleteButton" onClick={this.modalOpen ? this.closeModal : this.openModal}> Delete </button>
            {this.state.modalOpen &&
              <div>
                <div> Are you sure? </div>
                <button className="deleteButton" onClick={this.delete}> Yes </button>
                <button className="deleteButton" onClick={this.closeModal}> No </button>

              </div>
            }
          </div>
        }
      </div>
    )
  }
}




export default Match
