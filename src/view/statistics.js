import {films} from "../main.js";

export const createStatisticsTemplate = () => {
  return `<p>${films.length} movies inside</p>`;
};
