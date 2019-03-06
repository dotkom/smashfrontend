import React from 'react';
import { connect } from 'react-redux'
import '../styles/characterpicker.css';


class CharacterPicker extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setCharacter = this.setCharacter.bind(this);
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

  setCharacter(id) {
    this.closeModal()
    this.props.setCharacter(id)
  }




  render(){
    return(
      <div className="characterPicker" ref={node => { this.node = node; }}>
        <button className="currentCharacter" onClick={this.modalOpen ? this.closeModal : this.openModal}>
          {this.props.currentCharacter ? (
          <img src={`/icons/characters/${(this.props.currentCharacter==55 || this.props.currentCharacter==56) ? 54 : this.props.currentCharacter}.png`}/>
        ) : (
          <div className="imgalt"> char </div>
        )} </button>
        {this.state.modalOpen &&
          <div className="characterModal">
            { this.props.characters.map((char) => (
              <button key={char.id} className="characterButton" onClick={()=> this.setCharacter(char.id)}>
                <img src={`/icons/characters/${(char.id==55 || char.id==56) ? 54 : char.id}.png`}/>
              </button>
            ))}
          </div>
        }
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    characters: state.characters.characters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPicker)
