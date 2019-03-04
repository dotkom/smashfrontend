import React from 'react';
import '../styles/tempuser.css';


class TempUser extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.delete = this.delete.bind(this);
    this.activate = this.activate.bind(this);
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
    this.props.delete(this.props.id)

  }

  activate(id) {
    this.props.activate(this.props.id)
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
      <div className="tempUserContainer">
          <div className="information">
            <div className="name">
              {this.props.name}
            </div>
            <div className="nick">
              {this.props.nick}
            </div>
            <div className="email">
              {this.props.email}
            </div>
          </div>
          <div className="adminPanel" ref={node => { this.node = node; }}>
            <button className="deleteButton" onClick={this.activate}> Activate </button>
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
      </div>
    )
  }
}




export default TempUser