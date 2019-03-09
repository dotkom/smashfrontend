import React from 'react';
import { connect } from 'react-redux';
import '../styles/errormessage.css';
import PropTypes from 'prop-types';


const ErrorMessage = ({
  errorMessage,
}) => (
  <div className="errorMessage">
    {errorMessage}
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = dispatch => ({
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorMessage);
