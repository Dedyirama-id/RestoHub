import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const addToFavoriteBtnLogic = {
  async isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
};

export default addToFavoriteBtnLogic;
