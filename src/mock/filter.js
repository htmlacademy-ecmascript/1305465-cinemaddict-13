const getWatchedFilms = (films) => {
  return films.filter((film) => {
    return film.watched;
  });
};

const getWatchlistFilms = (films) => {
  return films.filter((film) => {
    return film.watchlist;
  });
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => {
    return film.watchlist;
  });
};

const generateFilterData = (films) => {
  return {
    watched: getWatchedFilms(films),
    watchlist: getWatchlistFilms(films),
    favorite: getFavoriteFilms(films),
  };
};

export {generateFilterData};
