export const createGenresTemplate = (genres) => {
  return genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`).join(``);
};
