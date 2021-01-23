import AbstractView from "./abstract-view.js";

const createNoFilmsMessageTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilmsMessageView extends AbstractView {
  _getTemplate() {
    return createNoFilmsMessageTemplate();
  }
}
