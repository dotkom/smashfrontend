import React from 'react';
import { connect } from 'react-redux'
import '../styles/profile.css';
import { getTempUsers, activateTempUser, deleteTempUser } from '../actions/admin'
import TempUser from '../components/TempUser'



class Admin extends React.Component {



  componentDidMount() {
    this.props.getUsers()
  }



  render(){
    return(
      <div className="profileContainer">
        <div className="tempUserContainer">
        { this.props.tempusers.map((user) =>(
            <TempUser
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              nick={user.nick}
              activate={this.props.activate}
              delete={this.props.delete}


            />
          ))
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.admin.isLoading,
    tempusers: state.admin.tempusers,
    errorMessage: state.admin.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getTempUsers()),
    activate: (id) => dispatch(activateTempUser(id)),
    delete: (id) => dispatch(deleteTempUser(id)),


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
