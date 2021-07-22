import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import GoogleButton from './GoogleButton';


class GoogleAuth extends Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '702388084899-t1h4lele48hhfachc5j76mn4tpsvkcnv.apps.googleusercontent.com',
        scope: 'email'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });

  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn)
      this.props.signIn(this.auth.currentUser.get().getId());
    else
      this.props.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null)
      return (
        <GoogleButton disabled>
          Loading
        </GoogleButton>);


    if (this.props.isSignedIn)
      return (
        <GoogleButton onClick={this.onSignOutClick} >
          Sign Out
        </GoogleButton>
      );
    return (
      <GoogleButton onClick={this.onSignInClick} >
        Sign In
      </GoogleButton>
      /* <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon"></i>
        Sign In
      </button> */
    );
  }

  render() {
    return (
      <div style={{ width: '120px' }} >
        {this.renderAuthButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};


export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);