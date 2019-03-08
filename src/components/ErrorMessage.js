import React from 'react';
import { connect } from 'react-redux';
import '../styles/errormessage.css';


class ErrorMessage extends React.Component {
  render() {
    return (
      <div className="errorMessage">
        {this.props.errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = dispatch => ({
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorMessage);
