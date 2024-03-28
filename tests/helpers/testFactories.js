import '../../src/scripts/components/add-to-favorite-btn';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  const addRestaurantToFavoriteBtn = document.createElement('add-to-favorite-button');
  document.querySelector('#add-to-favorite-container').appendChild(addRestaurantToFavoriteBtn);
  addRestaurantToFavoriteBtn.restaurant = restaurant;
  addRestaurantToFavoriteBtn.favoriteRestaurants = FavoriteRestaurantIdb;
  await addRestaurantToFavoriteBtn.render();
};

export { createFavoriteButtonPresenterWithRestaurant };
