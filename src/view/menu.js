export const createMenuTemplate = (navLinks) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navLinks.map(({href, isActive, label, count: fimCount}) =>
    `<a href="#${href}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : `` }">
    ${label} ${fimCount ? `<span class="main-navigation__item-count">${fimCount}</span>` : `` }</a>`).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
