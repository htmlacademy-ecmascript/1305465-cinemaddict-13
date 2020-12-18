import {createElement} from "../utils.js";

const createExtraFilmListContainerTemplate = () => {
  return `<div class="films-list__container">
    </div>`;
};

export default class ExtraFilmsListContainerView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmListContainerTemplate();
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
