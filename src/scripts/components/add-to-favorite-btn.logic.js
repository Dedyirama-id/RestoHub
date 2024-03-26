import FavoriteMovieIdb from '../data/favorite-restaurant-idb';

const addToFavoriteBtnLogic = {
  async isRestaurantExist(id) {
    const movie = await FavoriteMovieIdb.getRestaurant(id);
    return !!movie;
  },
};

export default addToFavoriteBtnLogic;
