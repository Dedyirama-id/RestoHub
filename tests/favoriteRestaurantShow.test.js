/* eslint-disable no-new */
import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/favoritedRestaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/favoritedRestaurant/favorite-restaurant-view';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            vote_average: 3,
            overview: 'Sebuah film A',
          },
          {
            id: 22,
            name: 'B',
            vote_average: 4,
            overview: 'Sebuah film B',
          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
