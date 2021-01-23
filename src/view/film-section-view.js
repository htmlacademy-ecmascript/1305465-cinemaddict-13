import AbstractView from "./abstract-view.js";

const createFilmSectionTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmSectionView extends AbstractView {
  _getTemplate() {
    return createFilmSectionTemplate();
  }
}
