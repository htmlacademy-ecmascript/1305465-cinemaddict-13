import {render, RenderPosition} from './mock/util.js';
import UserView from "./view/user-profile.js";
import MenuView from "./view/menu.js";
import SortingView from "./view/sorting.js";
import FilmSectionView from "./view/film-section.js";
import FilmsListView from "./view/film-list.js";
import ExtraFilmsListView from "./view/extra-film-list.js";
import ShowMoreButtonView from "./view/show-more.js";
import CardListView from './view/film-card.js';
import StatisticsView from "./view/statistics.js";
import PopupView from "./view/popup.js";
import {generateFilmCard, generateComments} from "./mock/data.js";
import {generateFilterData} from "./mock/filter.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;
const MAX_FILMS_COUNT = 20;


export let films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
export let topFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);
export let commentedFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);

const filterData = generateFilterData();

const cardComponent = (film) => new CardListView(film).getElement();

const pageHeaderElement = document.querySelector(`.header`);
const pageBodyElement = document.querySelector(`body`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const footerStatsElement = pageFooterElement.querySelector(`.footer__statistics`);

render(pageHeaderElement, RenderPosition.BEFOREEND, new UserView().getElement());
render(pageMainElement, RenderPosition.BEFOREEND, new MenuView(filterData).getElement());
render(pageMainElement, RenderPosition.BEFOREEND, new SortingView().getElement());
render(pageMainElement, RenderPosition.BEFOREEND, new FilmSectionView().getElement());
render(footerStatsElement, RenderPosition.BEFOREEND, new StatisticsView().getElement());

const filmSectionElement = pageMainElement.querySelector(`.films`);

render(filmSectionElement, RenderPosition.BEFOREEND, new FilmsListView().getElement());

const filmsElement = pageMainElement.querySelector(`.films`);

render(filmsElement, RenderPosition.BEFOREEND, new ExtraFilmsListView(`Top rated`, `toprated`).getElement());
render(filmsElement, RenderPosition.BEFOREEND, new ExtraFilmsListView(`Most commented`, `mostcommented`).getElement());

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);
const mostCommentedContainerElement = document.getElementById(`mostcommented`);
const topRatedContainerElement = document.getElementById(`toprated`);

films.forEach((film) => {
  render(filmsContainerElement, `afterbegin`, cardComponent(film));
});

filmsContainerElement.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.classList.contains(`film-card__poster`)
   || target.classList.contains(`film-card__title`)
   || target.classList.contains(`film-card__comments`)) {

    const activeFilm =
      films.find((film) => {
        return film.id === target.parentElement.dataset.id;
      });

    renderPopup(activeFilm);
  }
});

topFilms.forEach((topFilm) => {
  render(topRatedContainerElement, `afterbegin`, cardComponent(topFilm));
});

topRatedContainerElement.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.classList.contains(`film-card__poster`)
   || target.classList.contains(`film-card__title`)
   || target.classList.contains(`film-card__comments`)) {

    const activeFilm =
      topFilms.find((topFilm) => {
        return topFilm.id === target.parentElement.dataset.id;
      });

    renderPopup(activeFilm);
  }
});

commentedFilms.forEach((commentedFilm) => {
  render(mostCommentedContainerElement, `afterbegin`, cardComponent(commentedFilm));
});

mostCommentedContainerElement.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.classList.contains(`film-card__poster`)
   || target.classList.contains(`film-card__title`)
   || target.classList.contains(`film-card__comments`)) {

    const activeFilm =
       commentedFilms.find((commentedFilm) => {
         return commentedFilm.id === target.parentElement.dataset.id;
       });

    renderPopup(activeFilm);
  }
});

const renderPopup = (currentFilm) => {
  render(pageMainElement, RenderPosition.BEFOREEND, new PopupView(currentFilm, generateComments()).getElement());
  pageBodyElement.classList.add(`hide-overflow`);

  const popupElement = document.querySelector(`.film-details`);
  const popupCloseBtnElement = popupElement.querySelector(`.film-details__close-btn`);

  popupCloseBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    popupElement.remove();
    pageBodyElement.classList.remove(`hide-overflow`);
    popupCloseBtnElement.removeEventListener(`click`, evt);
  });
};

if (films.length < MAX_FILMS_COUNT) {
  const allFilmsContainerElement = filmsElement.querySelector(`.films-list`);
  let renderedFilmsCount = FILMS_COUNT;
  render(allFilmsContainerElement, RenderPosition.BEFOREEND, new ShowMoreButtonView().getElement());
  const showMoreFilmsBtnElement = filmsElement.querySelector(`.films-list__show-more`);

  showMoreFilmsBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    let addedFilms = new Array(FILMS_COUNT).fill().map(generateFilmCard);
    addedFilms.forEach((film) => {
      render(filmsContainerElement, `beforeend`, cardComponent(film));
      films.push(film);
    }
    );

    renderedFilmsCount += FILMS_COUNT;

    if (renderedFilmsCount >= MAX_FILMS_COUNT) {
      showMoreFilmsBtnElement.remove();
      showMoreFilmsBtnElement.removeEventListener(`click`, evt);
    }
  });
}
