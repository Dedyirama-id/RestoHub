/* eslint-disable no-undef */

import '../src/scripts/components/add-to-favorite-btn';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unfavoriting A Restaurant', () => {
  const addFavoriteButton = async () => {
    const addRestaurantToFavoriteBtn = document.createElement('add-to-favorite-button');
    document.body.appendChild(addRestaurantToFavoriteBtn);
    addRestaurantToFavoriteBtn.restaurant = { id: 1 };
    await addRestaurantToFavoriteBtn.render();
  };

  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await addFavoriteButton();
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display add to favorite widget when the restaurant has been favorited', async () => {
    expect(document.querySelector('[aria-label="remove from favorite"]')).toBeTruthy();
  });

  it('should not display add to favorite widget when the restaurant has been favorited', async () => {
    expect(document.querySelector('[aria-label="add to favorite"]')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click remove from favorite widget if the unfavorited movie is not in the list', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
