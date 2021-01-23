const getWatchedFilms = (films) => films.filter((film) => film.watched);
const getWatchlistFilms = (films) =>
  films.filter((film) => film.plannedToWatch);
const getFavoriteFilms = (films) => films.filter((film) => film.favorite);

const generateFilterData = (films) => {
  return [
    {
      label: `All movies`,
      isActive: true,
      href: `all`
    },
    {
      label: `History`,
      isActive: false,
      href: `history`,
      count:
        getWatchedFilms(films).length >= 1 ? getWatchedFilms(films).length : `0`
    },
    {
      label: `Watchlist`,
      isActive: false,
      href: `watchlist`,
      count:
        getWatchlistFilms(films).length >= 1
          ? getWatchlistFilms(films).length
          : `0`
    },
    {
      label: `Favorites`,
      isActive: false,
      href: `favorites`,
      count:
        getFavoriteFilms(films).length >= 1
          ? getFavoriteFilms(films).length
          : `0`
    }
  ];
};

export {generateFilterData};
