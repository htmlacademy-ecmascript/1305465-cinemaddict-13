import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createExtraFilmTemplate} from "./view/extra-film.js";
import {createShowMoreTemplate} from "./view/show-more.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createPopupTemplate} from "./view/popup.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

const pageHeaderElement = document.querySelector(`.header`);
const pageMainElement = document.querySelector(`.main`);
const pageFooterElement = document.querySelector(`.footer`);
const footerStatsElement = pageFooterElement.querySelector(`.footer__statistics`);

render(pageHeaderElement, `beforeend`, createUserProfileTemplate());
render(pageMainElement, `beforeend`, createMenuTemplate());
render(pageMainElement, `beforeend`, createFilmListTemplate());
render(footerStatsElement, `beforeend`, createStatisticsTemplate());

const filmsElement = pageMainElement.querySelector(`.films-list`);

render(filmsElement, `afterend`, createExtraFilmTemplate(`Most commented`));
render(filmsElement, `afterend`, createExtraFilmTemplate(`Top rated`));
render(filmsElement, `beforeend`, createShowMoreTemplate());

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);
const extraFilmsContainerElements = pageMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsContainerElement, `beforeend`, createFilmCardTemplate());
}

for (let list of extraFilmsContainerElements) {
  for (let i = 0; i < TOP_FILMS_COUNT; i++) {
    render(list, `beforeend`, createFilmCardTemplate());
  }
}

render(pageMainElement, `beforeend`, createPopupTemplate());
