import {render, RenderPosition} from "./utils.js";
import UserProfileView from "./view/user-profile-view.js";
import MenuView from "./view/menu-view.js";
import SortingView from "./view/sorting-view.js";
import FilmSectionView from "./view/film-section-view.js";
import FilmsListView from "./view/film-list-view.js";
import ExtraFilmsListView from "./view/extra-film-list-view.js";
import ShowMoreButtonView from "./view/show-more-button-view.js";
import FilmCardView from "./view/film-card-view.js";
import StatisticsView from "./view/statistics-view.js";
import PopupView from "./view/popup-view.js";
import FilmsListContainerView from "./view/film-list-container-view.js";
import ExtraFilmsListContainerView from "./view/extra-film-list-container-view.js";
// import NoFilmsMessageView from "./view/no-films-message-view.js";
import {
  generateComments,
  films,
  topFilms,
  commentedFilms,
  addedFilms,
  FILMS_COUNT
} from "./mock/data.js";
import {generateFilterData} from "./mock/filter.js";

const MAX_FILMS_COUNT = 20;

const filterData = generateFilterData();

const renderFilm = (container, position, film) =>
  render(
      container,
      RenderPosition[position],
      new FilmCardView(film).getElement()
  );

const pageHeaderElement = document.querySelector(`.header`);
const pageBodyElement = document.querySelector(`body`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const footerStatsElement = pageFooterElement.querySelector(
    `.footer__statistics`
);

const filmSectionElement = new FilmSectionView().getElement();
const showMoreFilmsBtnElement = new ShowMoreButtonView().getElement();
const filmsListElement = new FilmsListView().getElement();
const filmsListContainerElement = new FilmsListContainerView().getElement();
const mostCommentedListElement = new ExtraFilmsListView(
    `Most commented`
).getElement();
const topRatedListElement = new ExtraFilmsListView(`Top rated`).getElement();
const mostCommentedContainerElement = new ExtraFilmsListContainerView().getElement();
const topRatedContainerElement = new ExtraFilmsListContainerView().getElement();

const findFilm = (filmsArray, filmId) => {
  return filmsArray.find((film) => {
    return film.id === filmId;
  });
};

const renderPopup = (currentFilm) => {
  const popupElement = new PopupView(
      currentFilm,
      generateComments()
  ).getElement();
  pageMainElement.appendChild(popupElement);
  pageBodyElement.classList.add(`hide-overflow`);

  const popupCloseBtnElement = popupElement.querySelector(
      `.film-details__close-btn`
  );

  const onPopupCloseBtnClick = (evt) => {
    evt.preventDefault();
    pageMainElement.removeChild(popupElement);
    pageBodyElement.classList.remove(`hide-overflow`);
    popupCloseBtnElement.removeEventListener(`click`, onPopupCloseBtnClick);
  };

  const onPopupEscClick = (evt) => {
    if (evt.key === `Escape`) {
      pageMainElement.removeChild(popupElement);
      pageBodyElement.classList.remove(`hide-overflow`);
    }
    popupCloseBtnElement.removeEventListener(`click`, onPopupEscClick);
  };

  popupCloseBtnElement.addEventListener(`click`, onPopupCloseBtnClick);
  document.addEventListener(`keydown`, onPopupEscClick);
};

render(
    pageHeaderElement,
    RenderPosition.BEFOREEND,
    new UserProfileView().getElement()
);
render(
    pageMainElement,
    RenderPosition.BEFOREEND,
    new MenuView(filterData).getElement()
);

render(
    pageMainElement,
    RenderPosition.BEFOREEND,
    new SortingView().getElement()
);

render(
    footerStatsElement,
    RenderPosition.BEFOREEND,
    new StatisticsView().getElement()
);

// Тут сообщение об отсутствии фильмов
// render(
//     pageMainElement,
//     RenderPosition.BEFOREEND,
//     new NoFilmsMessageView().getElement()
// );

render(pageMainElement, RenderPosition.BEFOREEND, filmSectionElement);
render(filmSectionElement, RenderPosition.BEFOREEND, filmsListElement);
render(filmsListElement, RenderPosition.BEFOREEND, filmsListContainerElement);
render(filmSectionElement, RenderPosition.BEFOREEND, topRatedListElement);
render(filmSectionElement, RenderPosition.BEFOREEND, mostCommentedListElement);
render(topRatedListElement, RenderPosition.BEFOREEND, topRatedContainerElement);
render(
    mostCommentedListElement,
    RenderPosition.BEFOREEND,
    mostCommentedContainerElement
);

films.forEach((film) => {
  renderFilm(filmsListContainerElement, `AFTERBEGIN`, film);
});

filmsListContainerElement.addEventListener(`click`, (evt) => {
  let target = evt.target;
  if (
    target.classList.contains(`film-card__poster`) ||
    target.classList.contains(`film-card__title`) ||
    target.classList.contains(`film-card__comments`)
  ) {
    const activeFilm = findFilm(films, target.parentElement.dataset.id);

    renderPopup(activeFilm);
  }
});

topFilms.forEach((topFilm) => {
  renderFilm(topRatedContainerElement, `AFTERBEGIN`, topFilm);
});

topRatedContainerElement.addEventListener(`click`, (evt) => {
  let target = evt.target;
  if (
    target.classList.contains(`film-card__poster`) ||
    target.classList.contains(`film-card__title`) ||
    target.classList.contains(`film-card__comments`)
  ) {
    const activeFilm = findFilm(topFilms, target.parentElement.dataset.id);

    renderPopup(activeFilm);
  }
});

commentedFilms.forEach((commentedFilm) => {
  renderFilm(mostCommentedContainerElement, `BEFOREEND`, commentedFilm);
});

mostCommentedContainerElement.addEventListener(`click`, (evt) => {
  let target = evt.target;
  if (
    target.classList.contains(`film-card__poster`) ||
    target.classList.contains(`film-card__title`) ||
    target.classList.contains(`film-card__comments`)
  ) {
    const activeFilm = findFilm(
        commentedFilms,
        target.parentElement.dataset.id
    );

    renderPopup(activeFilm);
  }
});

if (films.length < MAX_FILMS_COUNT) {
  let renderedFilmsCount = FILMS_COUNT;
  render(filmsListElement, RenderPosition.BEFOREEND, showMoreFilmsBtnElement);

  const onshowMoreFilmsBtnClick = (evt) => {
    evt.preventDefault();
    addedFilms.forEach((film) => {
      renderFilm(filmsListContainerElement, `BEFOREEND`, film);
      films.push(film);
    });

    renderedFilmsCount += FILMS_COUNT;

    if (renderedFilmsCount >= MAX_FILMS_COUNT) {
      showMoreFilmsBtnElement.remove();
      showMoreFilmsBtnElement.removeEventListener(
          `click`,
          onshowMoreFilmsBtnClick
      );
    }
  };

  showMoreFilmsBtnElement.addEventListener(`click`, onshowMoreFilmsBtnClick);
}
