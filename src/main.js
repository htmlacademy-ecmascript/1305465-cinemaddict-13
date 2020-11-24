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
import {generateFilmCard} from "./mock/data.js";
import {generateFilterData} from "./mock/filter.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;
const MAX_FILMS_COUNT = 20;

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

export const films = new Array(MAX_FILMS_COUNT).fill().map(generateFilmCard);
const filterData = generateFilterData(films);

const pageHeaderElement = document.querySelector(`.header`);
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

render(filmsElement, `afterend`, createExtraFilmListTemplate(`Most commented`));
render(filmsElement, `afterend`, createExtraFilmListTemplate(`Top rated`));

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);
const extraFilmsContainerElements = pageMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_COUNT); i++) {
  render(filmsContainerElement, `beforeend`, createFilmCardTemplate(films[i]));
  const filmsPosterElement = filmsContainerElement.querySelectorAll(`.film-card__poster`);

  filmsPosterElement[i].addEventListener(`click`, (evt) => {
    evt.preventDefault();
    render(pageMainElement, `beforeend`, createPopupTemplate(films[i]));

    const popupElement = document.querySelector(`.film-details`);
    const popupCloseBtnElement = popupElement.querySelector(`.film-details__close-btn`);

    popupCloseBtnElement.addEventListener(`click`, () => {
      evt.preventDefault();
      popupElement.remove();
      document.removeEventListener(`click`, popupCloseBtnElement);
    });
  });
}

for (let list of extraFilmsContainerElements) {
  for (let i = 0; i < TOP_FILMS_COUNT; i++) {
    render(list, `beforeend`, createFilmCardTemplate(films[i]));

    const extraFilmsPosterElement = list.querySelectorAll(`.film-card__poster`);

    extraFilmsPosterElement[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      render(pageMainElement, `beforeend`, createPopupTemplate(films[i]));

      const popupElement = document.querySelector(`.film-details`);
      const popupCloseBtnElement = popupElement.querySelector(`.film-details__close-btn`);

      popupCloseBtnElement.addEventListener(`click`, () => {
        evt.preventDefault();
        popupElement.remove();
        document.removeEventListener(`click`, popupCloseBtnElement);
      });
    });
  }
}

if (films.length > FILMS_COUNT) {
  let renderedFilmsCount = FILMS_COUNT;
  render(filmsElement, `beforeend`, createShowMoreTemplate());
  const showMoreFilmsBtnElement = filmsElement.querySelector(`.films-list__show-more`);

  showMoreFilmsBtnElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT)
      .forEach((film) =>
        render(filmsContainerElement, `beforeend`, createFilmCardTemplate(film)));

    renderedFilmsCount += FILMS_COUNT;

    if (renderedFilmsCount >= films.length) {
      showMoreFilmsBtnElement.remove();
    }
  });
}
