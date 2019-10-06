import React from 'react';
import { connect } from 'react-redux';
import '../styles/userpicker.css';
import PropTypes from 'prop-types';


class UserPicker extends React.Component {
  static propTypes = {
    localitem: PropTypes.string.isRequired,
    setPlayer: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    player: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,

  }

  constructor(props) {
    super(props);
    this.setPlayer = this.setPlayer.bind(this);
    const localplayer = localStorage.getItem(this.props.localitem);
    if (localplayer) {
      this.setPlayer(localplayer);
    }
  }


  setPlayer(id) {
    this.props.setPlayer(id);
  }


  render() {
    return (
      <div className="userPicker">
        <input placeholder={this.props.placeholder} type="text" value={this.props.player} onChange={event => this.setPlayer(event.target.value)} />
        <div className="scrollerContainer">
          <div className="userScroller">
            { this.props.users.filter((user) => {
              if (this.props.player === '') {
                localStorage.setItem(this.props.localitem, '');
              }
              if (user.nick.toLowerCase() === this.props.player.toLowerCase()) {
                localStorage.setItem(this.props.localitem, user.nick);
              }
              return user.nick.toLowerCase().includes(this.props.player.toLowerCase());
            })
              .sort((a, b) => (`${a.nick}`).localeCompare(b.nick))
              .map(user => (
                <button type="button" key={user._id} onClick={() => this.setPlayer(user.nick)}>
                  {' '}
                  {user.nick}
                  {' '}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPicker);
