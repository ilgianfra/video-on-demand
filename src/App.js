import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import getAllMovies from './common/FetchApi';
import { getCounter } from './common/FirebaseApi';
import { createCopyWithCount } from './common/Utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preferredMovies: [],
    };
  }

  componentDidMount() {
    let arrayOfMovies = {};
    getCounter()
    .then((data) => {
      arrayOfMovies = data.val();
      return getAllMovies();
    })
    .then((res) => {
      const preferredMovies = createCopyWithCount(res.entries, arrayOfMovies);
      this.setState({ preferredMovies });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header logo={logo} />
        <MovieList
          movies={this.state.preferredMovies}
        />
      </div>
    );
  }
}

export default App;
