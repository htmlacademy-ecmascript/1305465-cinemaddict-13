import {createElement} from "../utils.js";

export const variants = {
  main: {
    containerClassName: ``,
    titleClassName: `visually-hidden`,
    title: `All movies. Upcoming`
  },
  commented: {
    containerClassName: `films-list--extra`,
    titleClassName: ``,
    title: `Most commented`
  },
  rated: {
    containerClassName: `films-list--extra`,
    titleClassName: ``,
    title: `Top rated`
  }
};

const createFilmListTemplate = (variant) => {
  return `<section class="${`films-list${
    variants[variant].containerClassName
      ? ` ${variants[variant].containerClassName}`
      : ``
  }`}">
    <h2 class="${`films-list__title${
    variants[variant].titleClassName
      ? ` ${variants[variant].titleClassName}`
      : ``
  }`}">${variants[variant].title}</h2>
    </section>`;
};

export default class FilmsListView {
  constructor(variant) {
    this._element = null;
    this._variant = variant;
  }

  getTemplate() {
    return createFilmListTemplate(this._variant);
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
