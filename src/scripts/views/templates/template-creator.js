import API_ENDPOINT from '../../globals/api-endpoint';

const RestaurantDetailTemplate = {

  createSkeleton() {
    return `
    <p class="title skeleton">restaurant title</p>
    <div class="image-container">
      <div class="add-to-favorite-btn skeleton">Add To Favorite</div>
      <img src="" class="restaurant-image skeleton">
    </div>
    <div class="restaurant-detail">
      <ul>
        <li class="skeleton">Address : Lorem ipsum</li>
        <li class="skeleton">Category : lorem, ipsum</li>
        <li class="skeleton">City : Lorem</li>
        <li class="skeleton">Lorem</li>
      </ul>
      <p class="skeleton">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, provident ab cum adipisci a, maiores obcaecati ducimus, itaque quidem omnis reiciendis aperiam optio distinctio iste blanditiis error sit libero. Fugit!
      Officia deleniti possimus libero enim a iure ducimus aspernatur voluptatibus quisquam voluptatem in ipsa minus esse quam non, vitae ea? Reiciendis corporis eligendi repudiandae beatae accusamus consequatur dolores facere aperiam.</p>
    </div>
  `;
  },

  createRestaurantDetail(restaurant) {
    return `
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
  },
};

export {
  RestaurantDetailTemplate,
};
