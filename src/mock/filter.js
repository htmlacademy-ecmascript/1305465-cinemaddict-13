import {getRandomNumber} from "./util.js";

const getWatchedFilms = () => {
  return getRandomNumber(1, 20);
};

const getWatchlistFilms = () => {
  return getRandomNumber(1, 20);
};

const getFavoriteFilms = () => {
  return getRandomNumber(1, 20);
};

const generateFilterData = () => {
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
      count: getWatchedFilms()
    },
    {
      label: `Watchlist`,
      isActive: false,
      href: `watchlist`,
      count: getWatchlistFilms()
    },
    {
      label: `Favorites`,
      isActive: false,
      href: `favorites`,
      count: getFavoriteFilms()
    }
  ];
};

export {generateFilterData};
