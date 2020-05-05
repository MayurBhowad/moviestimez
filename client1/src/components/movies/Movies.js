import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

import { getMovies } from '../../actions/movieAction';

import MovieItem from './MovieItem';

class Movies extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const { movies, loading } = this.props.movie;
    let movieItems;

    if (movies === null || loading) {
      movieItems = <Spinner />;
    } else {
      if (movies.length > 0) {
        movieItems = movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ));
      } else {
        movieItems = <h4>No movie found...</h4>;
      }
    }

    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h1 class="my-4">
                Movies
                {/* <small>Secondary Text</small> */}
              </h1>
              {movieItems}

              <ul class="pagination justify-content-center mb-4">
                <li class="page-item">
                  <a class="page-link" href="#">
                    &larr; Older
                  </a>
                </li>
                <li class="page-item disabled">
                  <a class="page-link" href="#">
                    Newer &rarr;
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-md-4">
              <div class="card my-4">
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search for..."
                    />
                    <span class="input-group-btn">
                      <button class="btn btn-secondary" type="button">
                        Go!
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div class="card my-4">
                <h5 class="card-header">Categories</h5>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <a href="#">Hollywood</a>
                        </li>
                        <li>
                          <a href="#">Bollywood</a>
                        </li>
                        <li>
                          <a href="#"></a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-lg-6">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <a href="#">Hindi</a>
                        </li>
                        <li>
                          <a href="#">English</a>
                        </li>
                        <li>
                          <a href="#">Tamil</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card my-4">
                <h5 class="card-header">Side Widget</h5>
                <div class="card-body">
                  You can put anything you want inside of these side widgets.
                  They are easy to use, and feature the new Bootstrap 4 card
                  containers!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Movies.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMovies })(Movies);
