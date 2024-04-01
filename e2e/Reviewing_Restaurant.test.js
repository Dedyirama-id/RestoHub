/* eslint-disable no-undef */
Feature('Reviewing Restaurants');
const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Reviewing first restaurant', async ({ I }) => {
  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant-item');
  I.click('.restaurant-item');

  I.seeElement('#add-review-button');
  I.click('#add-review-button');

  I.waitForElement('#review-form');
  I.seeElement('#review-form');
  I.seeElement('#name-input');
  I.seeElement('#review-input');
  I.seeElement('#review-submit-btn');

  I.waitForElement('review-card');
  const visibleReviews = await I.grabNumberOfVisibleElements('review-card');

  const reviewData = {
    name: 'John Doe',
    review: 'Tempat bersih dan nyaman.',
  };

  I.fillField('#name-input', reviewData.name);
  I.fillField('#review-input', reviewData.review);
  I.click('#review-submit-btn');

  I.waitForElement('review-card');
  I.seeElement('review-card');

  I.seeNumberOfElements('review-card', visibleReviews + 1);

  const allReviewName = await I.grabTextFromAll('.review-card__name');
  const allReview = await I.grabTextFromAll('.review-card__review');

  assert.strictEqual(allReviewName[allReviewName.length - 1], reviewData.name);
  assert.strictEqual(allReview[allReview.length - 1], reviewData.review);
});
