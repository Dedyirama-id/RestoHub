/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

xScenario('Showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

xScenario('Favoriting one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant-item');

  const firstRestaurant = locate('shadow=.restaurant-item__name');
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click('.restaurant-item');
  I.seeElement('add-to-favorite-button');
  I.click('add-to-favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoritedRestaurantName = await I.grabTextFrom('shadow=.restaurant-item__name');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

xScenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.restaurant-item');
  I.seeElement('shadow=.restaurant-item');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-item').at(i));
    I.seeElement('add-to-favorite-button');
    I.click('add-to-favorite-button');
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
