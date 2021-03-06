import React from 'react';
import '../styles/admin.css';
import API_ADDRESS from '../config/connections';


const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errorMessage: '',
    };
    this.getUsers();
  }

  getUsers() {
    axios.get(`${API_ADDRESS}/admin/users`)
      .then(response => response.data)
      .then((users) => {
        this.setState({
          users,
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }

  changeNick(id, nick) {
    axios.post(`${API_ADDRESS}/admin/user/changenick`, { _id: id, nick })
      .then(response => response.data)
      .then((user) => {
        this.setState((prevState, props) => ({
          users: prevState.users.map((object) => {
            if (id === object._id) {
              const updatedUser = object;
              updatedUser.nick = user.nick;
              return updatedUser;
            }
            return object;
          }),
          errorMessage: '',
        }));
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }


  banUser(id) {
    axios.post(`${API_ADDRESS}/admin/user/ban`, { _id: id })
      .then(response => response.data)
      .then((user) => {
        this.setState((prevState, props) => ({
          users: prevState.users.map((object) => {
            if (id === object._id) {
              const updatedUser = object;
              updatedUser.isBanned = true;
              updatedUser.isAdmin = false;
              return updatedUser;
            }
            return object;
          }),
          errorMessage: '',
        }));
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }

  unbanUser(id) {
    axios.post(`${API_ADDRESS}/admin/user/unban`, { _id: id })
      .then(response => response.data)
      .then((user) => {
        this.setState((prevState, props) => ({
          users: prevState.users.map((object) => {
            if (id === object._id) {
              const updatedUser = object;
              updatedUser.isBanned = false;
              return updatedUser;
            }
            return object;
          }),
          errorMessage: '',
        }));
      })
      .catch((err) => {
      });
  }

  makeAdmin(id) {
    axios.post(`${API_ADDRESS}/admin/user/makeadmin`, { _id: id })
      .then(response => response.data)
      .then((user) => {
        this.setState((prevState, props) => ({
          users: prevState.users.map((object) => {
            if (id === object._id) {
              const updatedUser = object;
              updatedUser.isAdmin = true;
              updatedUser.isBanned = false;
              return updatedUser;
            }
            return object;
          }),
          errorMessage: '',
        }));
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }

  removeAdmin(id) {
    axios.post(`${API_ADDRESS}/admin/user/removeadmin`, { _id: id })
      .then(response => response.data)
      .then((user) => {
        this.setState((prevState, props) => ({
          users: prevState.users.map((object) => {
            if (id === object._id) {
              const updatedUser = object;
              updatedUser.isAdmin = false;
              return updatedUser;
            }
            return object;
          }),
          errorMessage: '',
        }));
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data,
        });
      });
  }

  render() {
    return (
      <div className="adminPage">
        <div className="errorMessage">
          {' '}
          {this.state.errorMessage}
          {' '}
        </div>
        <div className="userList">
          {this.state.users.map(user => (
            <React.Fragment key={user._id}>
              <div className="tags">
                {user.isAdmin && <div className="admin tag"> admin </div>}
                {user.isBanned && <div className="banned tag"> banned </div>}
              </div>
              <div className="nick">
                {user.nick}
              </div>
              <input className={`input${user._id}`} type="text" />
              <button type="button" onClick={() => this.changeNick(user._id, document.querySelectorAll(`.input${user._id}`)[0].value)}> change nick </button>
              <div className="name">
                {user.name}
              </div>
              <div className="email">
                {user.email}
              </div>
              <button type="button" onClick={() => (user.isBanned ? this.unbanUser(user._id) : this.banUser(user._id))}>
                {' '}
                {user.isBanned ? 'unban' : 'ban'}
                {' '}
              </button>
              <button type="button" onClick={() => (user.isAdmin ? this.removeAdmin(user._id) : this.makeAdmin(user._id))}>
                {' '}
                {user.isAdmin ? 'remove admin' : 'make admin'}
                {' '}
              </button>

            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}


export default Admin;
