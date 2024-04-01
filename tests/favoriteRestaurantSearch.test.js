import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favoritedRestaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/favoritedRestaurant/favorite-restaurant-view';
import '../src/scripts/components/card-hover';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for favorited restaurant', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the Restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 111, name: 'restaurant abc', description: 'ini adalah restaurant abc', rating: 5,
            },
            {
              id: 222, name: 'ada juga restaurant abcde', description: 'ini adalah restaurant abcde', rating: 4.5,
            },
            {
              id: 333, name: 'ini juga boleh restaurant a', description: 'ini adalah restaurant a', rating: 4,
            },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurant found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantElements = document.querySelectorAll('.restaurant-item');

          expect(restaurantElements.item(0).showedName).toEqual('restaurant abc');
          expect(restaurantElements.item(1).showedName).toEqual('ada juga restaurant abcde');
          expect(restaurantElements.item(2).showedName).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 111, name: 'restaurant abc', description: 'ini adalah restaurant abc', rating: 5,
            },
            {
              id: 222, name: 'ada juga restaurant abcde', description: 'ini adalah restaurant abcde', rating: 4.5,
            },
            {
              id: 333, name: 'ini juga boleh restaurant a', description: 'ini adalah restaurant a', rating: 4,
            },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantElements = document.querySelectorAll('.restaurant-item');
          expect(restaurantElements.item(0).showedName).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{
            id: 444, description: 'ini adalah restaurant tanpa nama', rating: 4,
          }];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });

    describe('When no favorite restaurants could be found', () => {
      it('should show the empty message', (done) => {
        document
          .getElementById('restaurants')
          .addEventListener('restaurants:updated', () => {
            expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
            done();
          });
        favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
        searchRestaurants('restaurant a');
      });

      it('should not show any restaurant', (done) => {
        document.getElementById('restaurants')
          .addEventListener('restaurants:updated', () => {
            expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
            done();
          });
        favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
        searchRestaurants('restaurant a');
      });
    });
  });
});
