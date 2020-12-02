import {getRandomNumber} from "../mock/util.js";

export const createStatisticsTemplate = () => {
  return `<p>${getRandomNumber(1, 20)} movies inside</p>`;
};
