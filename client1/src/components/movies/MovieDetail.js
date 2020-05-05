import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMovieById } from '../../actions/movieAction';
import Spinner from '../common/Spinner';

class MovieDetail extends Component {
  componentDidMount() {
    if (this.props.match.params._id) {
      this.props.getMovieById(this.props.match.params._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.movie === null && this.props.movie.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { movie, loading } = this.props.movie;
    let movieContent;

    if (movie === null || loading) {
      movieContent = <Spinner />;
    } else {
      movieContent = (
        <div class="col-lg-8">
          {/* <!-- Title --> */}
          <h1 class="mt-4">{movie.movietitle}</h1>

          {/* <!-- Author --> */}
          <p class="lead">
            by
            <a href="#">Start Bootstrap</a>
          </p>

          <hr />

          {/* <!-- Date/Time --> */}
          <p>Posted on January 1, 2019 at 12:00 PM</p>

          <hr />
          {/* <!-- Preview Image --> */}
          <img
            class="img-fluid rounded"
            src="http://placehold.it/900x300"
            alt=""
          />

          <hr />

          {/* <!-- Post Content --> */}
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
            vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit
            excepturi nam quia corporis eligendi eos magni recusandae laborum
            minus inventore?
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
            tenetur natus doloremque laborum quos iste ipsum rerum obcaecati
            impedit odit illo dolorum ab tempora nihil dicta earum fugiat.
            Temporibus, voluptatibus.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos,
            doloribus, dolorem iusto blanditiis unde eius illum consequuntur
            neque dicta incidunt ullam ea hic porro optio ratione repellat
            perspiciatis. Enim, iure!
          </p>

          <blockquote class="blockquote">
            <p class="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer class="blockquote-footer">
              Someone famous in
              <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>

          <hr />
        </div>
      );
    }

    return (
      <div>
        <div class="container">
          <div class="row">
            {/* <!-- Post Content Column --> */}
            {movieContent}
            {/* <!-- Sidebar Widgets Column --> */}
            <div class="col-md-4">
              {/* <!-- Search Widget --> */}
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

              {/* <!-- Categories Widget --> */}
              <div class="card my-4">
                <h5 class="card-header">Categories</h5>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <a href="#">Web Design</a>
                        </li>
                        <li>
                          <a href="#">HTML</a>
                        </li>
                        <li>
                          <a href="#">Freebies</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-lg-6">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <a href="#">JavaScript</a>
                        </li>
                        <li>
                          <a href="#">CSS</a>
                        </li>
                        <li>
                          <a href="#">Tutorials</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Side Widget --> */}
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
          {/* <!-- /.row --> */}
        </div>
      </div>
    );
  }
}

MovieDetail.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, { getMovieById })(MovieDetail);
