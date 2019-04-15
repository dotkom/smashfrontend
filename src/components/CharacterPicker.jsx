import React from 'react';
import { connect } from 'react-redux';
import '../styles/characterpicker.css';
import PropTypes from 'prop-types';


class CharacterPicker extends React.Component {
  static propTypes = {
    localitem: PropTypes.string.isRequired,
    setCharacter: PropTypes.func.isRequired,
    currentCharacter: PropTypes.number.isRequired,
    characters: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      charInput: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setCharacter = this.setCharacter.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }


  componentDidMount() {
    const localcharacter = JSON.parse(localStorage.getItem(this.props.localitem));
    if (localcharacter) {
      this.setCharacter(localcharacter.id, localcharacter._id);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  setCharacter(id, _id) {
    this.closeModal();
    const obj = { id, _id };
    localStorage.setItem(this.props.localitem, JSON.stringify(obj));
    this.props.setCharacter(id, _id);
  }

  closeModal() {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.setState({
      modalOpen: false,
      charInput: '',
    });
  }

  openModal() {
    document.addEventListener('click', this.handleOutsideClick, false);
    this.setState({
      modalOpen: true,
    });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.closeModal();
  }


  render() {
    return (

      <div className="characterPicker" ref={(node) => { this.node = node; }}>
        <button type="button" className="currentCharacter" onClick={this.modalOpen ? this.closeModal : this.openModal}>
          {this.props.currentCharacter !== 0 ? (
            <img alt="char" src={`/icons/characters/${(this.props.currentCharacter === 55 || this.props.currentCharacter === 56) ? 54 : this.props.currentCharacter}.png`} />
          ) : (
            <div className="imgalt"> ? </div>
          )}
          {' '}

        </button>
        {this.state.modalOpen
          && (
          <div className="characterModal">
            <input type="text" value={this.charInput} onChange={event => this.setState({ charInput: event.target.value })} />
            <div className="characterGrid">
              { this.props.characters.filter((char) => {
                if (this.state.charInput === '') {
                  return true;
                }
                if (char.name.toLowerCase().includes(this.state.charInput.toLowerCase())) {
                  return true;
                }
                return false;
              }).map(char => (
                <button type="button" key={char.id} className="characterButton" onClick={() => this.setCharacter(char.id, char._id)}>
                  <img alt="char" title={char.name} src={`/icons/characters/${(char.id === 55 || char.id === 56) ? 54 : char.id}.png`} />
                </button>
              ))}
            </div>
          </div>
          )
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  characters: state.characters.characters,
});

const mapDispatchToProps = dispatch => ({


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterPicker);
