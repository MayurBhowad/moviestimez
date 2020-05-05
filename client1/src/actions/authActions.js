import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from './types';

import setAuthToken from '../utils/setAuthToken';

//REGISTER user
export const registeruser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get user Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('api/users/login', userData)
    .then((res) => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);

      //install jwt-decode
      //decode token to get user data
      const decoded = jwt_decode(token);
      //setCurrent user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//logout user
export const logoutUser = () => (dispatch) => {
  //Remove token from local Token
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//CLear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
