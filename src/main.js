import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilmSortingTemplate} from "./view/sorting.js";
import {createFilmSectionTemplate} from "./view/film-section.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createExtraFilmListTemplate} from "./view/extra-film-list.js";
import {createShowMoreTemplate} from "./view/show-more.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createPopupTemplate} from "./view/popup.js";
import {generateFilmCard, generateComments} from "./mock/data.js";
import {generateFilterData} from "./mock/filter.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;
const MAX_FILMS_COUNT = 20;

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

export let films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
export let topFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);
export let commentedFilms = new Array(TOP_FILMS_COUNT).fill().map(generateFilmCard);

const filterData = generateFilterData();

const pageHeaderElement = document.querySelector(`.header`);
const pageBodyElement = document.querySelector(`body`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const footerStatsElement = pageFooterElement.querySelector(`.footer__statistics`);

render(pageHeaderElement, `beforeend`, createUserProfileTemplate());
render(pageMainElement, `beforeend`, createMenuTemplate(filterData));
render(pageMainElement, `beforeend`, createFilmSortingTemplate());
render(pageMainElement, `beforeend`, createFilmSectionTemplate());
render(footerStatsElement, `beforeend`, createStatisticsTemplate());

const filmSectionElement = pageMainElement.querySelector(`.films`);

render(filmSectionElement, `beforeend`, createFilmListTemplate());

const filmsElement = pageMainElement.querySelector(`.films-list`);

render(filmsElement, `afterend`, createExtraFilmListTemplate(`Most commented`, `mostcommented`));
render(filmsElement, `afterend`, createExtraFilmListTemplate(`Top rated`, `toprated`));

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);
const mostCommentedContainerElement = document.getElementById(`mostcommented`);
const topRatedContainerElement = document.getElementById(`toprated`);

films.forEach((film) => {
  render(filmsContainerElement, `beforeend`, createFilmCardTemplate(film));
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
  render(topRatedContainerElement, `beforeend`, createFilmCardTemplate(topFilm));
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
  render(mostCommentedContainerElement, `beforeend`, createFilmCardTemplate(commentedFilm));
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
  render(pageMainElement, `beforeend`, createPopupTemplate(currentFilm, generateComments()));
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
  let renderedFilmsCount = FILMS_COUNT;
  render(filmsElement, `beforeend`, createShowMoreTemplate());
  const showMoreFilmsBtnElement = filmsElement.querySelector(`.films-list__show-more`);

  showMoreFilmsBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    let addedFilms = new Array(FILMS_COUNT).fill().map(generateFilmCard);
    addedFilms.forEach((film) => {
      render(filmsContainerElement, `beforeend`, createFilmCardTemplate(film));
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
