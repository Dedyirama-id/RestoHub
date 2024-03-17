import RestaurantApiSource from '../../data/restaurantapi-source';
import API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';

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
          <h2>Costumer Reviews</h2>
          <button id="add-review-button">Add Review +</button>
        </div>
        <form id="review-form" class="review-form">
          <label for="name">Name</label>
          <input type="text" name="name" id="name-input" placeholder="John Doe">
          <label for="review">Review</label>
          <input type="text" name="review" id="review-input" placeholder="Your review...">
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="review-container">
        <review-card></review-card>
        <review-card></review-card>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurantId = UrlParser.parseActiveUrlWithoutCombiner().id;
    const restaurant = await RestaurantApiSource.detailRestaurant(restaurantId);
    this._renderDetail(restaurant);
    this._renderMenu(restaurant.menus);
    this._renderReviews(restaurant.customerReviews);

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

  _renderDetail(restaurant) {
    const detailContainer = document.querySelector('.detail');
    detailContainer.innerHTML = `
      <div class="title">
        <p>${restaurant.name}</p>
      </div>
      <div class="main-img">
        <img src="${API_ENDPOINT.IMAGE.LARGE(restaurant.pictureId)}" alt="${restaurant.name} image">
        <p>${restaurant.description}</p>
        <div class="city-address">
          <p id="city">${restaurant.city}</p>
          <hr>
          <p id="address">${restaurant.address}</p>
        </div>
        <div class="tags">
          <ul id="categories">
            ${restaurant.categories.map((category) => `<li>${category.name}</li>`).join('')}
          </ul>
          <hr>
          <p class="rating"><img src="./svg/star.svg" alt="star-icon"><span>${restaurant.rating.toFixed(2)}</span></p>
        </div>
      </div>
    `;
  },

  _renderMenu({ foods, drinks }) {
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
