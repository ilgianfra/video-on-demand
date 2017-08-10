export const triggerKeyboardEvent = (el, keyCode) => {
  const eventObj = document.createEventObject ?
    document.createEventObject() : document.createEvent('Events');

  if (eventObj.initEvent) {
    eventObj.initEvent('keydown', true, true);
  }

  eventObj.keyCode = keyCode;
  eventObj.which = keyCode;
  // eslint-disable-next-line
  el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent('onkeydown', eventObj);
};
export const createCopyWithCount = (array, arrayOfMovies) => {
  const preferredMovies = array.map((e) => {
    const obj = arrayOfMovies[' ' + e.id]; // eslint-disable-line
    if (obj) {
      e.count = obj.count;
    } else {
      e.count = 0;
    }
    return e;
  });
  return preferredMovies.sort((a, b) => b.count - a.count);
};

