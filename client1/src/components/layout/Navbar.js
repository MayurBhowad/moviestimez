import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser, clearCurrentProfile } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link class="nav-link" to="/addmovie">
            Add Movie
          </Link>
        </li>

        <li class="nav-item">
          <a className="nav-link" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link class="nav-link" to="/register">
            Sign up
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <div className="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container">
            <Link class="navbar-brand" to="/">
              MoviesTimez
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/movies">
                    Movies
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
