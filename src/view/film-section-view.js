import {createElement} from "../utils.js";

const createFilmSectionTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmSectionView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmSectionTemplate();
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
