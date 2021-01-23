import AbstractView from "./abstract-view.js";

const createStatisticsTemplate = (films) => {
  return `<p>${films} movies inside</p>`;
};

export default class TotalMovieView extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  _getTemplate() {
    return createStatisticsTemplate(this._films);
  }
}
