import API_ENDPOINT from '../../globals/api-endpoint';
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <p class="title">${restaurant.name}</p>
  <div class= "image-container">
    <add-to-favorite-button></add-to-favorite-button>
    <img src="${API_ENDPOINT.IMAGE.LARGE(restaurant.pictureId)}" alt="${restaurant.name} image" class="restaurant-image">
  </div>
  <div class="restaurant-detail">
    <ul>
      <li>Address : ${restaurant.address}</li>
      <li>Category : ${restaurant.categories.map((category) => category.name).join(', ')}</li>
      <li>City : ${restaurant.city}</li>
      <li class="rating"><span>Rating :</span>
      <img src="./svg/star.svg" alt="star icon" class="star-icon"> 
      <span>${restaurant.rating.toFixed(2)}</span> 
      </li>
    </ul>
    <p>${restaurant.description}</p>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.title || '-'}"
           src="${restaurant.backdrop_path ? CONFIG.BASE_IMAGE_URL + restaurant.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.vote_average || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.title || '-'}</a></h3>
      <p>${restaurant.overview || '-'}</p>
    </div>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
};
