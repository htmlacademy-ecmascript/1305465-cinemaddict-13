import AbstractView from "./abstract-view.js";
import {formatDate} from "../utils/common.js";

const SHORT_DESCRIPTION_LENGTH = 139;

const createFilmCardTemplate = ({
  title,
  poster,
  description,
  rating,
  genres,
  releaseDate,
  duration,
  commentsCount,
  id
}) => {
  const year = formatDate(releaseDate, `YYYY`);
  const hours = formatDate(duration, `H[h] `);
  const minutes = formatDate(duration, `MM[m]`);
  const genre = genres[0] ? genres[0] : ``;
  const shortDescription =
    description.length > SHORT_DESCRIPTION_LENGTH
      ? `${description.substr(0, SHORT_DESCRIPTION_LENGTH)}&hellip;`
      : description;
  return `<article class="film-card" data-id="${id}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${hours}${minutes}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  _getTemplate() {
    return createFilmCardTemplate(this._cards);
  }
}
