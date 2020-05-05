import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile,
} from './actions/authActions';

import './App.css';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Movies from './components/movies/Movies';
import EditMovie from './components/movies/EditMovie';
import Addmovie from './components/movies/Addmovie';
import MovieDetail from './components/movies/MovieDetail';
import PrivateRoute from './components/common/PrivateRoute';

//check for token
if (localStorage.jwtToken) {
  //set auth token to header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and  get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //setUser and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for Expired TOken
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/id/:id" component={MovieDetail} />
            <Switch>
              <PrivateRoute exact path="/addmovie" component={Addmovie} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/editmovie" component={EditMovie} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
