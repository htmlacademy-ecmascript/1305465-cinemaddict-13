import UserProfileView from "./view/user-profile-view.js";
import MenuView from "./view/menu-view.js";
import SortingView from "./view/sorting-view.js";
import FilmSectionView from "./view/film-section-view.js";
import FilmsListView from "./view/film-list-view.js";
import ShowMoreButtonView from "./view/show-more-button-view.js";
import FilmCardView from "./view/film-card-view.js";
import TotalMovieView from "./view/total-movie-view.js";
import PopupView from "./view/popup-view.js";
import FilmsListContainerView from "./view/film-list-container-view.js";
import NoFilmsMessageView from "./view/no-films-message-view.js";
import {
  render,
  remove,
  addElement,
  removeElement,
  RenderPosition
} from "./utils/render.js";
import {
  generateComments,
  films,
  topFilms,
  commentedFilms,
  FILMS_COUNT
} from "./mock/data.js";
import {generateFilterData} from "./utils/filter.js";
import {keyCodes} from "./utils/enums.js";

const filterData = generateFilterData(films);
const showMoreFilmsBtnElement = new ShowMoreButtonView();

const pageHeaderElement = document.querySelector(`.header`);
const pageBodyElement = document.querySelector(`body`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const footerStatsElement = pageFooterElement.querySelector(
    `.footer__statistics`
);

const filmSectionElement = new FilmSectionView();

const filmsListElement = new FilmsListView(`main`);
const filmsListContainerElement = new FilmsListContainerView();
const mostCommentedListElement = new FilmsListView(`commented`);
const topRatedListElement = new FilmsListView(`rated`);
const mostCommentedContainerElement = new FilmsListContainerView();
const topRatedContainerElement = new FilmsListContainerView();

const renderFilm = (container, position, film) => {
  const filmElement = new FilmCardView(film);
  const popupElement = new PopupView(film, generateComments());

  render(container, position, filmElement);

  const closePopup = () => {
    removeElement(pageMainElement, popupElement);
    pageBodyElement.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const renderPopup = () => {
    addElement(pageMainElement, popupElement);
    pageBodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onPopupEscPress);
    popupElement.setCloseButtonClickHandler(closePopup);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === keyCodes.ESCAPE || evt.key === keyCodes.ESC) {
      closePopup();
    }
  };

  filmElement.setPosterClickHandler(renderPopup);
  filmElement.setCommentsClickHandler(renderPopup);
  filmElement.setTitleClickHandler(renderPopup);
};

render(pageHeaderElement, RenderPosition.BEFOREEND, new UserProfileView());
render(pageMainElement, RenderPosition.BEFOREEND, new MenuView(filterData));

render(
    footerStatsElement,
    RenderPosition.BEFOREEND,
    new TotalMovieView(films.length)
);

// Тут сообщение об отсутствии фильмов
if (films.length === 0) {
  render(filmsListElement, RenderPosition.BEFOREEND, new NoFilmsMessageView());
}
render(pageMainElement, RenderPosition.BEFOREEND, filmSectionElement);
render(filmSectionElement, RenderPosition.BEFOREEND, filmsListElement);

if (films.length !== 0) {
  render(filmsListElement, RenderPosition.AFTERBEGIN, new SortingView());
  render(filmsListElement, RenderPosition.BEFOREEND, filmsListContainerElement);
  render(filmSectionElement, RenderPosition.BEFOREEND, topRatedListElement);
  render(
      filmSectionElement,
      RenderPosition.BEFOREEND,
      mostCommentedListElement
  );
  render(
      topRatedListElement,
      RenderPosition.BEFOREEND,
      topRatedContainerElement
  );
  render(
      mostCommentedListElement,
      RenderPosition.BEFOREEND,
      mostCommentedContainerElement
  );
}

films.slice(0, FILMS_COUNT).forEach((film) => {
  renderFilm(filmsListContainerElement, RenderPosition.AFTERBEGIN, film);
});

topFilms.forEach((topFilm) => {
  renderFilm(topRatedContainerElement, RenderPosition.BEFOREEND, topFilm);
});

commentedFilms.forEach((commentedFilm) => {
  renderFilm(
      mostCommentedContainerElement,
      RenderPosition.BEFOREEND,
      commentedFilm
  );
});

if (films.length >= FILMS_COUNT) {
  let filmsToRenderCount = FILMS_COUNT;

  if (films.length !== 0) {
    render(filmsListElement, RenderPosition.BEFOREEND, showMoreFilmsBtnElement);
  }

  showMoreFilmsBtnElement.setClickHandler(() => {
    const renderedFilmsCount = filmsToRenderCount;
    filmsToRenderCount += FILMS_COUNT;

    films
      .slice(renderedFilmsCount, filmsToRenderCount)
      .forEach((film) =>
        renderFilm(filmsListContainerElement, RenderPosition.BEFOREEND, film)
      );

    if (filmsToRenderCount >= films.length) {
      remove(showMoreFilmsBtnElement);
    }
  });
}
