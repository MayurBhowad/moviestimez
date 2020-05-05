import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { deleteMovie, getMovieById } from '../../actions/movieAction';

class MovieItem extends Component {
  onDeleteClick(id) {
    this.props.deleteMovie(id);
  }

  // onReadClick(id) {
  //   this.props.getMovieById(id);
  //   // window.location.assign('/moviedetail');
  // }

  render() {
    const { movie } = this.props;
    const { isAuthenticated } = this.props.auth;

    const releasedate = (
      <Moment format="MMM Do YYYY">{movie.releasedate}</Moment>
    );

    const deletebtn = (
      <a
        onClick={this.onDeleteClick.bind(this, movie._id)}
        class="btn btn-danger ml-2"
      >
        Remove
      </a>
    );

    return (
      <div>
        <div class="card mb-4">
          <img
            class="card-img-top"
            src="http://placehold.it/750x300"
            alt="Card image cap"
          />

          <div class="card-body">
            <h2 class="card-title">{movie.movietitle}</h2>
            <p class="card-text parathree">{movie.info}</p>
            <Link
              // to={`/movies/id/${movie._id}`}
              // onClick={this.onReadClick.bind(this, movie._id)}
              class="btn btn-primary"
            >
              Read More &rarr;
            </Link>
            {isAuthenticated ? deletebtn : ''}
          </div>
          <div class="card-footer text-muted">
            Release on {releasedate} Directed by{' '}
            <a href="#">{movie.director}</a>
          </div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  getMovieById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteMovie, getMovieById })(
  MovieItem
);
