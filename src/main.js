import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createMovieListTemplate} from "./view/movie-card.js";
import {createTopMoviesTemplate} from "./view/show-more.js";
import {createShowMoreTemplate} from "./view/show-more.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createStatisticsTemplate} from "./view/show-more.js";
import {createPopupTemplate} from "./view/popup.js";

const FILMS_COUNT = 5;
const TOP_FILMS_COUNT = 2;

const renderHtml = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const footerStats = pageFooter.querySelector(`.footer__statistics`);

renderHtml(pageHeader, `beforeend`, createUserProfileTemplate());
renderHtml(pageMain, `beforeend`, createMenuTemplate());
renderHtml(pageMain, `beforeend`, createMovieListTemplate());
renderHtml(footerStats, `beforeend`, createStatisticsTemplate());

const films = pageMain.querySelector(`.films-list`);

renderHtml(films, `afterend`, createTopMoviesTemplate());
renderHtml(films, `beforeend`, createShowMoreTemplate());

const filmsList = films.querySelector(`.films-list__container`);
const topFilmsLists = pageMain.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  renderHtml(filmsList, `beforeend`, createMovieCardTemplate());
}

for (let list of topFilmsLists) {
  for (let i = 0; i < TOP_FILMS_COUNT; i++) {
    renderHtml(list, `beforeend`, createMovieCardTemplate());
  }
}

renderHtml(pageMain, `beforeend`, createPopupTemplate());
