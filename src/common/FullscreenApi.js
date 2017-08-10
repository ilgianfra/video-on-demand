export const openFullScreen = (docelem) => {
  if (docelem.requestFullscreen) {
    docelem.requestFullscreen();
  } else if (docelem.mozRequestFullScreen) {
    docelem.mozRequestFullScreen();
  } else if (docelem.webkitRequestFullScreen) {
    docelem.webkitRequestFullScreen();
  } else if (docelem.msRequestFullscreen) {
    docelem.msRequestFullscreen();
  }
};

export const closeFullScreen = (docelem) => {
  if (docelem) {
    if (docelem.fullscreenElement || docelem.webkitDisplayingFullscreen ||
    docelem.mozDisplayingFullscreen || docelem.msDisplayingFullscreen) {
      return false;
    }
    return true;
  }
  return false;
};
