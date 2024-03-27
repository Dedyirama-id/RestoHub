import '../../src/scripts/components/add-to-favorite-btn';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  const addRestaurantToFavoriteBtn = document.createElement('add-to-favorite-button');
  document.querySelector('#add-to-favorite-container').appendChild(addRestaurantToFavoriteBtn);
  addRestaurantToFavoriteBtn.restaurant = restaurant;
  await addRestaurantToFavoriteBtn.render();
};

export { createFavoriteButtonPresenterWithRestaurant };
