import AbstractView from "./abstract-view.js";

const createFilmListContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsListContainerView extends AbstractView {
  _getTemplate() {
    return createFilmListContainerTemplate();
  }
}
