// import { createRestaurantItemTemplate } from '../../templates/template-creator';

import RestaurantsInitiator from '../../../utils/restaurants-initiator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div id="favorite-restaurant-list">
        <h2 class="content__heading">Your Favorited Restaurant</h2>
        <form class="search-bar">
          <input id="query" aria-label="Search restaurant input" class="search-input" type="text" placeholder="Restaurant for you...">
          <button class="submit-btn" type="submit" disabled>
            <p>Search</p>
          </button>
        </form>
        <div id="restaurants" class="card-container">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    document.querySelector('#restaurants').innerHTML = '';
    if (restaurants.length) {
      RestaurantsInitiator.init(document.querySelector('#restaurants'), restaurants);
    } else {
      document.querySelector('#restaurants').innerHTML = this._getEmptyRestaurantTemplate();
    }

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
