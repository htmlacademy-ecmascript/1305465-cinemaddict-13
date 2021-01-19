import {createElement} from "../utils/common.js";

const createMenuTemplate = (links) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${links
        .map(
            ({href, isActive, label, count: filmCount}) =>
              `<a href="#${href}" class="main-navigation__item${
                isActive ? ` main-navigation__item--active` : ``
              }">
    ${label} ${
  filmCount
    ? `<span class="main-navigation__item-count">${filmCount}</span>`
    : ``
}</a>`
        )
        .join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuView {
  constructor(links) {
    this._element = null;
    this._links = links;
  }

  getTemplate() {
    return createMenuTemplate(this._links);
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
