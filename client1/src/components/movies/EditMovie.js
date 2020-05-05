import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is-empty';

import { getCurrentMovie, createMovie } from '../../actions/movieAction';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      movietitle: '',
      director: '',
      releasedate: '',
      stars: '',
      info: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentMovie();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.movie.movie) {
      const movie = nextProps.movie.movie;

      //If profile field doesnt exist, make empty string
      movie.director = !isEmpty(movie.director) ? movie.director : '';
      movie.releasedate = !isEmpty(movie.releasedate) ? movie.releasedate : '';
      movie.stars = !isEmpty(movie.location) ? movie.location : '';
      movie.info = !isEmpty(movie.info) ? movie.info : '';

      movie.social = !isEmpty(movie.social) ? movie.social : {};
      movie.twitter = !isEmpty(movie.social.twitter)
        ? movie.social.twitter
        : '';
      movie.facebook = !isEmpty(movie.social.facebook)
        ? movie.social.facebook
        : '';
      movie.youtube = !isEmpty(movie.social.youtube)
        ? movie.social.youtube
        : '';
      movie.instagram = !isEmpty(movie.social.twitter)
        ? movie.social.twitter
        : '';

      //Set component field state
      this.setState({
        movietitle: movie.movietitle,
        director: movie.director,
        releasedate: movie.releasedate,
        stars: movie.stars,
        info: movie.info,

        twitter: movie.twitter,
        facebook: movie.facebook,
        youtube: movie.youtube,
        instagram: movie.instagram,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const movieData = {
      movietitle: this.state.movietitle,
      director: this.state.director,
      releasedate: this.state.releasedate,
      stars: this.state.stars,
      info: this.state.info,

      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };

    this.props.createMovie(movieData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="addmovie">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/movies" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Movie</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Movei Title"
                  name="movietitle"
                  value={this.state.movietitle}
                  onChange={this.onChange}
                  error={errors.movietitle}
                  info="A Title"
                />

                <TextFieldGroup
                  placeholder="Director"
                  name="director"
                  value={this.state.director}
                  onChange={this.onChange}
                  error={errors.director}
                  info="Name of Director"
                />
                <TextFieldGroup
                  placeholder="Release Date"
                  name="releasedate"
                  value={this.state.releasedate}
                  onChange={this.onChange}
                  error={errors.releasedate}
                  info="Release Date"
                />
                <TextFieldGroup
                  placeholder="Stars"
                  name="stars"
                  value={this.state.stars}
                  onChange={this.onChange}
                  error={errors.stars}
                  info="Actors"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="info"
                  value={this.state.info}
                  onChange={this.onChange}
                  error={errors.info}
                  info="Information"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditMovie.propTypes = {
  createMovie: PropTypes.func.isRequired,
  getCurrentMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentMovie, createMovie })(
  withRouter(EditMovie)
);
