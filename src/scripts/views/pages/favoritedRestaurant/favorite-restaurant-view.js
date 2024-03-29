// import { createRestaurantItemTemplate } from '../../templates/template-creator';

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
    if (restaurants.length) {
      restaurants.forEach((restaurant) => {
        document.querySelector('#restaurants').appendChild(this._getRestaurantItemTemplate(restaurant));
      });
    } else {
      document.querySelector('#restaurants').innerHTML = this._getEmptyRestaurantTemplate();
    }

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getRestaurantItemTemplate(restaurant) {
    const restaurantElement = document.createElement('card-hover');
    restaurantElement.classList.add('restaurant-item');
    restaurantElement.data = restaurant;
    return restaurantElement;
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
