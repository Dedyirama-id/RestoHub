import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import RestaurantsInitiator from '../../utils/restaurants-initiator';

const Favorite = {
  async render() {
    return `
    <section id="favorite-restaurant-list">
      <h2>Favorite Restaurants</h2>
      <div id="card-container" class="card-container">
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#card-container');
    restaurantsContainer.innerHTML = '';
    RestaurantsInitiator.init(restaurantsContainer, restaurants);
  },

  _handleCardClick(event) {
    event.preventDefault();
    window.location.hash = `/detail/${event.target.id}`;
  },

};

export default Favorite;
