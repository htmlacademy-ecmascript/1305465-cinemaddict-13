export const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export const createStatisticsTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

export const createTopMoviesTemplate = () => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};
