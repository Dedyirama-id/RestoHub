const RestaurantsInitiator = {
  init(restaurantsContainer, restaurants) {
    restaurants.forEach((restaurant) => {
      const card = document.createElement('card-hover');
      card.classList.add('restaurant-item');
      card.data = restaurant;
      card.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.hash = `/detail/${event.target.id}`;
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          window.location.hash = `/detail/${event.target.id}`;
        }
      });
      restaurantsContainer.appendChild(card);
    });
  },
};

export default RestaurantsInitiator;
