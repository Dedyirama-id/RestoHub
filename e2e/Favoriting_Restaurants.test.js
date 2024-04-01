/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('Favoriting one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-item');

  const firstRestaurant = locate('.restaurant-item__name');
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click('.restaurant-item');
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoritedRestaurantName = await I.grabTextFrom('.restaurant-item__name');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-item').at(i));
    I.seeElement('[aria-label="add to favorite"]');
    I.click('[aria-label="add to favorite"]');
    names.push(await I.grabTextFrom('.title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  I.waitForElement('.restaurant-item');
  const visibleFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleFavoritedRestaurant);

  const searchQuery = names[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurant = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurant.length, visibleSearchedFavoritedRestaurant);

  const restaurantNameElements = locate('.restaurant-item__name');
  const visibleNames = await I.grabTextFromAll(restaurantNameElements);
  for (let i = 0; i < matchingRestaurant.length; i++) {
    assert.strictEqual(matchingRestaurant[i], visibleNames[i]);
  }
});

Scenario('Favoriting one restaurant then remove it from favorite', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-item');

  const firstRestaurant = locate('.restaurant-item__name');
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click('.restaurant-item');
  I.seeElement('[aria-label="add to favorite"]');
  I.click('[aria-label="add to favorite"]');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const totalFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(totalFavoritedRestaurant, 1);

  const favoritedRestaurantName = await I.grabTextFrom('.restaurant-item__name');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

  I.click('.restaurant-item');
  I.seeElement('[aria-label="remove from favorite"]');
  I.click('[aria-label="remove from favorite"]');

  I.amOnPage('/#/favorite');
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
