import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

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
    this._showRestaurantList(restaurants);
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

export default Favorite;
