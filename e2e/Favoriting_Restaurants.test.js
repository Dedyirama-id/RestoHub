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

  const firstRestaurant = locate('shadow=.restaurant-item__title');
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click('.restaurant-item');
  I.seeElement('add-to-favorite-button');
  I.click('add-to-favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoritedRestaurantTitle = await I.grabTextFrom('shadow=.restaurant-item__title');
  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario('searching movies', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.restaurant-item');
  I.seeElement('shadow=.restaurant-item');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-item').at(i));
    I.seeElement('add-to-favorite-button');
    I.click('add-to-favorite-button');
    titles.push(await I.grabTextFrom('.title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  I.waitForElement('.restaurant-item');
  const visibleFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(titles.length, visibleFavoritedRestaurant);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurant.length, visibleSearchedFavoritedRestaurant);

  const restaurantTitleElements = locate('.restaurant-item__title');
  const visibleTitles = await I.grabTextFromAll(restaurantTitleElements);
  for (let i = 0; i < matchingRestaurant.length; i++) {
    assert.strictEqual(matchingRestaurant[i], visibleTitles[i]);
  }
});

// xScenario('Testing', async ({ I }) => {
//   I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

//   I.amOnPage('/');
//   I.waitForElement('.restaurant-item');
//   const element = locate('.restaurant-item__title');
//   const html = await I.grabTextFromAll(element);
//   assert.strictEqual(html[1], 'Kafe Kita');
// });
