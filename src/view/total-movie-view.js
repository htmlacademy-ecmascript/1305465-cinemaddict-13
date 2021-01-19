import {createElement} from "../utils/common.js";

const createStatisticsTemplate = (films) => {
  return `<p>${films} movies inside</p>`;
};

export default class TotalMovieView {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
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
