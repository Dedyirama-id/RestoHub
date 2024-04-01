import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import RestaurantApiSource from '../../data/restaurantapi-source';
import UrlParser from '../../routes/url-parser';
import { RestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <loader-status></loader-status>
    <div class="detail">
    </div>
    <div id="menu" class="menu">
      <h2>Menu List</h2>
      <div>
        <h3>🥘 Foods</h3>
        <ul id="food-list">
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
        </ul>
      </div>
      <hr>
      <div>
        <h3>🍸 Drinks</h3>
        <ul id="drinks-list">
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
          <li class="skeleton">Lorem ipsum dolor.</li>
        </ul>
      </div>
    </div>
    <div id="reviews" class="reviews">
      <div class="heading">
        <div class="heading-text">
          <h2>Customer Reviews</h2>
          <button id="add-review-button"><span>Add Review</span>+</button>
        </div>
        <form id="review-form" class="review-form">
          <label for="name">Name</label>
          <input type="text" name="name" id="name-input" placeholder="Your name" required>
          <label for="review">Review</label>
          <input type="text" name="review" id="review-input" placeholder="Your review" required>
          <div class="end-button-form">
            <loader-status></loader-status>
            <button type="submit" id="review-submit-btn" class="submit-btn">Submit</button>
          </div>
        </form>
      </div>
      <div class="review-container"> 
        <review-card></review-card>
        <review-card></review-card>
        <review-card></review-card>
      </div>
    </div>
    `;
  },

  async afterRender() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const detailContainer = document.querySelector('.detail');
    detailContainer.innerHTML = RestaurantDetailTemplate.createSkeleton();
    const loaderStatus = document.querySelector('loader-status');
    const restaurantId = UrlParser.parseActiveUrlWithoutCombiner().id;
    try {
      const restaurant = await RestaurantApiSource.detailRestaurant(restaurantId);
      detailContainer.innerHTML = RestaurantDetailTemplate.createRestaurantDetail(restaurant);

      this._renderMenus(restaurant.menus);
      this._renderReviews(restaurant.customerReviews);

      const addToFavoriteButton = document.querySelector('add-to-favorite-button');
      addToFavoriteButton.restaurant = restaurant;
      addToFavoriteButton.favoriteRestaurants = FavoriteRestaurantIdb;
    } catch (error) {
      loaderStatus.error = error;
    }

    const openFormButton = document.querySelector('#add-review-button');
    openFormButton.addEventListener('click', () => {
      const reviewForm = document.querySelector('#review-form');
      reviewForm.classList.toggle('open');
      openFormButton.innerHTML = reviewForm.classList.contains('open') ? '<span>Close</span> - ' : '<span>Add Review</span> +';
    });

    const reviewForm = document.querySelector('#review-form');
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleReviewSubmit(restaurantId);
    });
  },

  _renderReviews(reviews) {
    const reviewContainer = document.querySelector('#reviews .review-container');
    reviewContainer.innerHTML = '';
    reviews.forEach((review) => {
      const reviewCard = document.createElement('review-card');
      reviewCard.data = review;
      reviewContainer.appendChild(reviewCard);
    });
  },

  async _handleReviewSubmit(id) {
    const reviewForm = document.querySelector('#review-form');
    const reviewFormElements = reviewForm.querySelectorAll('input, button');
    const loaderStatus = reviewForm.querySelector('loader-status');
    try {
      reviewFormElements.forEach((element) => {
        element.disabled = true;
      });

      loaderStatus.renderLoad();
      const data = await RestaurantApiSource.postReview({
        id,
        name: document.querySelector('#name-input').value,
        review: document.querySelector('#review-input').value,
      });
      loaderStatus.render();

      this._renderReviews(data.customerReviews);
    } catch (error) {
      loaderStatus.error = error;
    } finally {
      reviewFormElements.forEach((element) => {
        element.disabled = false;
        element.value = '';
      });
    }
  },

  _renderMenus({ foods, drinks }) {
    const foodList = document.querySelector('#food-list');
    const drinksList = document.querySelector('#drinks-list');
    foodList.innerHTML = '';
    drinksList.innerHTML = '';
    foods.forEach((food) => {
      foodList.innerHTML += `<li>${food.name}</li>`;
    });
    drinks.forEach((drink) => {
      drinksList.innerHTML += `<li>${drink.name}</li>`;
    });
  },
};

export default Detail;
