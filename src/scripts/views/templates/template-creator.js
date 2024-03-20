import API_ENDPOINT from '../../globals/api-endpoint';

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

export default createRestaurantDetailTemplate;
