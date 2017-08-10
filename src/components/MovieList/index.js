import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../MovieItem';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItemId: null,
      currentIndex: -1,
    };
    this.onClickVideo = this.onClickVideo.bind(this);
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      e = e || window.event; // eslint-disable-line
      switch (e.which || e.keyCode) {
        case 37: // left
          this.prevElement();
          break;
        case 39: // right
          this.nextElement();
          break;
        default: return; // exit this handler for other keys
      }
      e.preventDefault();
    };
  }

  onClickVideo(idVideo, index) {
    this.setState({ currentIndex: index }, () => {
      this.focusElement();
    });
    this.setState({ currentItemId: idVideo });
  }

  focusElement() {
    const elem = document.getElementsByClassName('tile')[this.state.currentIndex];
    elem.focus();
  }

  nextElement() {
    if (this.state.currentIndex < this.props.movies.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        this.focusElement();
      });
      this.setState({ currentItemId: this.props.movies[this.state.currentIndex].id });
    }
  }

  prevElement() {
    if (this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex - 1 }, () => {
        this.focusElement();
      });
      this.setState({ currentItemId: this.props.movies[this.state.currentIndex].id });
    }
  }

  render() {
    return (
      this.props.movies.length > 0 &&
      <div className="row">
        <div className="row__inner">
          {
            this.props.movies.map((movie, index) => (
              <MovieItem
                key={movie.id}
                index={movie.id}
                title={movie.title}
                poster={movie.images[0]}
                video={movie.contents[0]}
                counter={movie.count}
                isSelected={this.state.currentItemId === movie.id}
                onPlay={() => this.onClickVideo(movie.id, index)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
