/* eslint-disable no-return-assign */
import {
  beforeEach, describe, expect, it,
} from '@jest/globals';

import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favoriting A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="add-to-favorite-container"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="add to favorite"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="remove from favorite"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    const addRestaurantToFavoriteBtn = document.querySelector('add-to-favorite-button');
    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add the restaurant again when it already exists in the favorite', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    const addRestaurantToFavoriteBtn = document.querySelector('add-to-favorite-button');
    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).not.toEqual([{ id: 1 }]);
  });

  it('should not add the restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});
    const addRestaurantToFavoriteBtn = document.querySelector('add-to-favorite-button');
    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
