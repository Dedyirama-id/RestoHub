import RestaurantApiSource from '../../data/restaurantapi-source';
import UrlParser from '../../routes/url-parser';
import createRestaurantDetailTemplate from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div class="detail">
    </div>
    <div id="menu" class="menu">
      <h2>Menu List</h2>
      <div>
        <h3>🥘 Foods</h3>
        <ul id="food-list">
        </ul>
      </div>
      <hr>
      <div>
        <h3>🍸 Drinks</h3>
        <ul id="drinks-list">
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
          <input type="text" name="name" id="name-input" placeholder="John Doe">
          <label for="review">Review</label>
          <input type="text" name="review" id="review-input" placeholder="Your review...">
          <button type="submit" id="review-submit-btn" class="submit-btn">Submit</button>
        </form>
      </div>
      <div class="review-container"> 
      </div>
    </div>
    `;
  },

  async afterRender() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const restaurantId = UrlParser.parseActiveUrlWithoutCombiner().id;
    const restaurant = await RestaurantApiSource.detailRestaurant(restaurantId);
    const detailContainer = document.querySelector('.detail');
    detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    this._renderMenus(restaurant.menus);
    this._renderReviews(restaurant.customerReviews);

    const addToFavoriteButton = document.querySelector('add-to-favorite-button');
    addToFavoriteButton.restaurant = restaurant;

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
    const data = await RestaurantApiSource.postReview({
      id,
      name: document.querySelector('#name-input').value,
      review: document.querySelector('#review-input').value,
    });
    this._renderReviews(data.customerReviews);
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
