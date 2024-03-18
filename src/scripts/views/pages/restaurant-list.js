import RestaurantApiSource from '../../data/restaurantapi-source';
import scrollToElement from '../../utils/scroll-to';

const RestaurantList = {
  async render() {
    return `
    <div class="hero">
      <div class="tagline">
        <p>
          Search. <br>
          Find. <br>
          Discover.
        </p>
      </div>
      <div class="hero-img">
        <div class="start">
          <p>Find a Suitable Restaurant For You!</p>
          <button id="cta-button"><span>Let's Start</span> <img src="svg/right-arrow.svg"
              alt="Right arrow"></button>
        </div>
        <img src="images/heros/hero-image_4.jpg" alt="Hero image">
        <div class="end">
          <p><i>Your journey to extraordinary dining experiences starts here.</i></p>
        </div>
      </div>
    </div>
    <section id="restaurant-list">
      <form class="search-bar">
        <input id="searchInput" aria-label="Search restaurant input" aria-placeholder="test" class="search-input"
          type="text" placeholder="Restaurant for you...">
        <button class="submit-btn" type="submit">
          <p>Search</p>
        </button>
      </form>
      <div id="card-container" class="card-container">
      </div>
    </section>
    <article id="article-1">
      <h2> <span class="icon">🚀</span> <span> How to Find Suitable Restaurant For You?</span></h2>
      <p>Are you often overwhelmed when choosing a restaurant? Here are some valuable tips to help you discover the
        perfect dining spot tailored to your preferences</p>
      <ol>
        <li>
          <h3>Define Your Crafings</h3>
          <p>Before deciding on a restaurant, pinpoint the specific cuisine or type of food you're in the mood for.
            Knowing your
            cravings can narrow down your choices.</p>
        </li>
        <li>
          <h3>Consider Dietary Preferences</h3>
          <p>Take into account any dietary restrictions or preferences you may have. Look for restaurants that offer
            options aligned
            with your dietary needs.</p>
        </li>
        <li>
          <h3>Check Reviews and Ratings</h3>
          <p>Browse online reviews and ratings from other diners. Reviews and Ratings can provide
            insights into the overall dining experience, helping you make informed decisions.
          </p>
        </li>
        <li>
          <h3>Location Matters</h3>
          <p>Evaluate the restaurant's location. Choose a place that is convenient for you, considering factors like
            proximity,
            parking, and accessibility.</p>
        </li>
        <li>
          <h3>Explore New Culinary Experiences</h3>
          <p>Don't hesitate to step out of your comfort zone. Consider trying new cuisines or innovative dishes to
            broaden your
            culinary horizons.</p>
        </li>
      </ol>
      <img src="images/heros/hero-image_2.jpg" alt="Side image">
    </article>
    `;
  },

  async afterRender() {
    const ctaButton = document.querySelector('#cta-button');
    ctaButton.addEventListener('click', () => scrollToElement({
      targetElement: document.querySelector('#restaurant-list'),
      offsetElement: document.querySelector('header'),
      offset: 16,
    }));

    const restaurants = await RestaurantApiSource.restaurantList();
    this._showRestaurantList(restaurants);

    const searchRestaurantForm = document.querySelector('#restaurant-list .search-bar');
    searchRestaurantForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = searchRestaurantForm.searchInput.value;
      const searchedRestaurant = await RestaurantApiSource.searchRestaurant(query);
      this._showRestaurantList(searchedRestaurant);
    });
  },

  _showRestaurantList(restaurants) {
    const restaurantCardContainer = document.querySelector('#card-container');
    restaurantCardContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      const card = document.createElement('card-hover');
      card.data = restaurant;
      restaurantCardContainer.appendChild(card);
      card.addEventListener('click', (event) => this._handleCardClick(event));
    });
  },

  _handleCardClick(event) {
    event.preventDefault();
    window.location.hash = `/detail/${event.target.id}`;
  },
};

export default RestaurantList;
