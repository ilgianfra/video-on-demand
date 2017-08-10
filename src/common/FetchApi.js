const getAllMovies = () =>
  fetch('https://demo2697834.mockable.io/movies')
  .then(resp => resp.json());

export default getAllMovies;
