import dayjs from "dayjs";

import {getRandomNumber} from "./util.js";
import {getRandomArray} from "./util.js";
import {getRandomElement} from "./util.js";
import {getRandomInteger} from "./util.js";

const generateDate = () => {
  return dayjs().startOf(`year`).add(getRandomNumber(0, 300), `day`).format(`D MMMM YYYY`);
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

  const randomTitle = getRandomElement(titles);

  return randomTitle;
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

  const randomPoster = getRandomElement(posters);

  return randomPoster;
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

  const randomIndex = getRandomArray(descriptions);
  randomIndex.length = getRandomNumber(1, 5);
  return randomIndex;
};

const generateGenres = () => {
  const genres = [
    `Action`,
    `Comedy`,
    `Drama`,
    `Horror`,
    `Romance`,
    `Thriller`
  ];

  const randomGenres = getRandomArray(genres);

  return randomGenres.slice(0, 3);
};

export const generateComments = (numberOfComments = getRandomNumber(1, 5)) => {
  const texts = [
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];
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

export const generateFilmCard = () => {
  getWatchedStatus();

  return {
    id: generateTitle() + generatePoster() + getRandomNumber(0, 100),
    title: generateTitle(),
    poster: generatePoster(),
    fullDescription: generateDescription().toString(),
    commentsCount: getRandomNumber(1, 9),
    rating: getRandomNumber(1, 5) + `.` + getRandomNumber(0, 9),
    releaseDate: generateDate(),
    year: getRandomNumber(1950, 2020),
    duration: getRandomNumber(1, 3) + `h ` + getRandomNumber(0, 9) + getRandomNumber(0, 9) + `m `,
    genres: generateGenres(),
    watched: isWatched,
    watchlist: getWatchlistStatus(),
    favorite: getFavoritesStatus()
  };
};
