import {createElement} from "../utils.js";
import {getRandomNumber} from "../mock/mock-utils.js";

const createStatisticsTemplate = () => {
  return `<p>${getRandomNumber(1, 20)} movies inside</p>`;
};

export default class StatisticsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
