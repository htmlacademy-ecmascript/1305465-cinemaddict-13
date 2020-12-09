import {createElement} from '../mock/util.js';

const createExtraFilmListTemplate = (title, id) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container" id="${id}">
    </div>
  </section>`;
};

export default class ExtraFilmsListView {
  constructor(title, id) {
    this._element = null;
    this._title = title;
    this._id = id;
  }

  getTemplate() {
    return createExtraFilmListTemplate(this._title, this._id);
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
