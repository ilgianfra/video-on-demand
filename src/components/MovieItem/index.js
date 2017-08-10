import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { openFullScreen, closeFullScreen } from '../../common/FullscreenApi';
import { triggerKeyboardEvent } from '../../common/Utils';
import { addCounterVideo } from '../../common/FirebaseApi';

class MovieItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isSelected: false,
    };
    this.openVideo = this.openVideo.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && this.state.isActive) {
        this.setState({ isSelected: true }, () => {
          this.toggleFullScreen('open');
        });
      }
      if (e.keyCode === 27 && this.state.isActive) {
        this.toggleFullScreen('close');
      }
    }, false);

    document.addEventListener('webkitfullscreenchange', () => {
      this.toggleFullScreen('close');
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isActive: nextProps.isSelected });
  }

  openVideo() {
    this.props.onPlay();
    this.setState({ isActive: true, isSelected: true }, () => {
      const docelem = document.getElementById(this.props.index);
      triggerKeyboardEvent(docelem, 13);
    });
  }

  toggleFullScreen(action) {
    const docelem = document.getElementById(this.props.index);
    if (action === 'open') {
      openFullScreen(docelem);
      addCounterVideo(this.props.index, this.props.counter + 1);
    }
    if (action === 'close') {
      const isClosed = closeFullScreen(docelem);
      if (isClosed) {
        this.setState({ isActive: false, isSelected: false });
      }
    }
  }

  render() {
    return (
      <div className="tile" tabIndex="-1">
        <div onClick={this.openVideo} role="button" aria-hidden>
          <div className="tile__media">
            <img
              className={`tile__img ${this.state.isActive ? 'is-active' : ''}`}
              width={this.props.poster.width}
              height={this.props.poster.height}
              src={this.props.poster.url}
              alt={this.props.poster.description}
            />
          </div>
          <div className="tile__details">
            <div className="tile__title">{this.props.title}</div>
          </div>
        </div>
        <div>
          {this.state.isActive && this.state.isSelected &&
            <div>
              <video
                id={this.props.index}
                src={this.props.video.url}
                autoPlay
                controls
              >
                <track
                  kind="captions"
                />
              </video>
            </div>
          }
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onPlay: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  index: PropTypes.string.isRequired,
};
MovieItem.defaultProps = {
  isSelected: false,
};

export default MovieItem;
