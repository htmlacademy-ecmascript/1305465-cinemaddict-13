import dayjs from "dayjs";

import {
  getRandomNumber,
  getRandomArray,
  getRandomElement,
  getRandomInteger
} from "./mock-utils.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const generateDate = () => {
  return dayjs()
    .startOf(`year`)
    .add(getRandomNumber(0, 300), `day`)
    .format(`D MMMM YYYY`);
};

const generateTime = () => {
  return dayjs()
    .startOf(`day`)
    .add(getRandomNumber(61, 300), `minute`);
};

const generateTitle = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`
  ];

  return getRandomElement(titles);
};

const generatePoster = () => {
  const posters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ];

  return getRandomElement(posters);
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomDescriptionArray = getRandomArray(descriptions);
  randomDescriptionArray.length = getRandomNumber(1, 5);
  return randomDescriptionArray;
};

const generateGenres = () => {
  const genres = [`Action`, `Comedy`, `Drama`, `Horror`, `Romance`, `Thriller`];

  return getRandomArray(genres).slice(0, 3);
};

const generateComments = (numberOfComments = getRandomNumber(1, 5)) => {
  const texts = [
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const emotions = [`smile`, `sleeping`, `puke`, `angry`];
  const authors = [
    `Karen Valby`,
    `David Bianculli`,
    `Brooke Hauser`,
    `Lucy Mangan`,
    `Sal Cinquemani`
  ];

  let comments = [];
  for (let i = 1; i <= numberOfComments; i++) {
    const comment = {
      text: getRandomElement(texts),
      emotion: getRandomElement(emotions),
      date: generateDate(),
      author: getRandomElement(authors)
    };
    comments.push(comment);
  }
  return comments;
};

let isWatched = false;

const getWatchedStatus = () => {
  isWatched = Boolean(getRandomInteger());
};

const getWatchlistStatus = () => {
  return isWatched ? false : Boolean(getRandomInteger());
};

const getFavoritesStatus = () => {
  return isWatched ? Boolean(getRandomInteger()) : false;
};

const generateFilmCard = () => {
  getWatchedStatus();

  return {
    id: generateTitle() + generatePoster() + getRandomNumber(0, 100),
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription().toString(),
    commentsCount: getRandomNumber(1, 9),
    rating: getRandomNumber(1, 5) + `.` + getRandomNumber(0, 9),
    releaseDate: generateDate(),
    duration: generateTime(),
    genres: generateGenres(),
    watched: isWatched,
    plannedToWatch: getWatchlistStatus(),
    favorite: getFavoritesStatus()
  };
};

let films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
let topFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);
let commentedFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);

export {
  generateFilmCard,
  generateComments,
  films,
  topFilms,
  commentedFilms,
  FILMS_COUNT
};
