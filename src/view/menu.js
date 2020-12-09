import {createElement} from '../mock/util.js';

const createMenuTemplate = (navLinks) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navLinks.map(({href, isActive, label, count: fimCount}) =>
    `<a href="#${href}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : `` }">
    ${label} ${fimCount ? `<span class="main-navigation__item-count">${fimCount}</span>` : `` }</a>`).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuView {
  constructor(navLinks) {
    this._element = null;
    this._links = navLinks;
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
