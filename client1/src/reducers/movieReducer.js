import {
  GET_MOVIE,
  MOVIE_LOADING,
  CLEAR_CURRENT_MOVIE,
  GET_MOVIES,
  DELETE_MOVIE,
} from '../actions/types';

const initialState = {
  movie: null,
  movies: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    default:
      return state;
  }
}
