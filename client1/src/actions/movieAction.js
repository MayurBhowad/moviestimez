import axios from 'axios';
import {
  MOVIE_LOADING,
  GET_MOVIE,
  GET_MOVIES,
  GET_ERRORS,
  DELETE_MOVIE,
} from './types';

//get current movie
export const getCurrentMovie = () => (dispatch) => {
  dispatch(setMovieLoading());
  axios
    .get('/api/movies/')
    .then((res) =>
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MOVIE,
        payload: {},
      })
    );
};

// Create Movie
export const createMovie = (movieData, history) => (dispatch) => {
  axios
    .post('/api/movies/', movieData)
    .then((res) => history.push('/movies'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get movie by id
export const getMovieById = (id) => (dispatch) => {
  dispatch(setMovieLoading());
  axios
    .get(`/api/movies/id/${id}`)
    .then((res) =>
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MOVIE,
        payload: null,
      })
    );
};

//Get all movies
export const getMovies = () => (dispatch) => {
  dispatch(setMovieLoading());
  axios
    .get('/api/movies/all')
    .then((res) =>
      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MOVIES,
        payload: null,
      })
    );
};

// Delete Movie
export const deleteMovie = (id) => (dispatch) => {
  axios
    .delete(`/api/movies/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_MOVIE,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//movie loading
export const setMovieLoading = () => {
  return {
    type: MOVIE_LOADING,
  };
};
