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
    const restaurantId = UrlParser.parseActiveUrlWithoutCombiner().id;
    const restaurant = await RestaurantApiSource.detailRestaurant(restaurantId);
    this._renderDetail(restaurant);
    this._renderMenu(restaurant.menus);
    this._renderReviews(restaurant.customerReviews);

    const openFormButton = document.querySelector('#add-review-button');
    openFormButton.addEventListener('click', () => {
      const reviewForm = document.querySelector('#review-form');
      reviewForm.classList.toggle('closed');

      if (reviewForm.classList.contains('closed')) {
        openFormButton.innerHTML = '<span>Add Review</span> +';
      } else {
        openFormButton.innerHTML = '<span>Close</span> - ';
      }
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

  _renderDetail(restaurant) {
    const detailContainer = document.querySelector('.detail');
    detailContainer.innerHTML = `
      <p class="title">${restaurant.name}</p>
      <div class= "image-container">
        <button class="add-to-favorite"><span>Add to Favorite</span><img src="./svg/heart-regular.svg" alt="Favorite button"></button>
        <img src="${API_ENDPOINT.IMAGE.LARGE(restaurant.pictureId)}" alt="${restaurant.name} image" class="restaurant-image">
      </div>
      <div class="restaurant-detail">
        <ul>
          <li>Address : ${restaurant.address}</li>
          <li>Category : ${restaurant.categories.map((category) => category.name).join(', ')}</li>
          <li>City : ${restaurant.city}</li>
          <li class="rating"><span>Rating :</span>
          <img src="./svg/star.svg" alt=""> 
          <span>${restaurant.rating.toFixed(2)}</span> 
          </li>
        </ul>
        <p>${restaurant.description}</p>
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
