import FavoriteMovieIdb from '../data/favorite-restaurant-idb';

class AddToFavoriteBtn extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  async render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
          
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        button.add-to-favorite {
          min-width: 44px;
          min-height: 44px;
          border-radius: 80px;
          -webkit-border-radius: 80px;
          -moz-border-radius: 80px;
          -ms-border-radius: 80px;
          -o-border-radius: 80px;

          background-color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          padding: 8px;     
          outline: none;
          border: none;     
        }

        span {
          font-size: clamp(1rem, 0.45vw + 0.89rem, 1.25rem);
          font-weight: bold;
          color: white;
          padding: 0 16px;
        }
        
        img {
          aspect-ratio: 1;
          height: 28px;
          padding: 2px;
          object-fit: cover;
        }
      </style>

      <button class="add-to-favorite"></button>
    `;

    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  }

  async _isRestaurantExist(id) {
    const movie = await FavoriteMovieIdb.getRestaurant(id);
    return !!movie;
  }

  _favoriteButtonTemplate() {
    return `
        <span>Add to Favorite</span>
        <img src="./svg/heart-regular.svg" alt="Favorite button">
    `;
  }

  _favoritedButtonTemplate() {
    return `
        <span>Added</span>
        <img src="./svg/heart-solid.svg" alt="Favorite button">
    `;
  }

  _renderFavorite() {
    const favoriteButton = this._shadowRoot.querySelector('.add-to-favorite');
    favoriteButton.innerHTML = this._favoriteButtonTemplate();
    favoriteButton.addEventListener('click', async () => {
      FavoriteMovieIdb.putRestaurant(this._restaurant);
      this.render();
    });
  }

  _renderFavorited() {
    const favoriteButton = this._shadowRoot.querySelector('.add-to-favorite');
    favoriteButton.innerHTML = this._favoritedButtonTemplate();
    favoriteButton.addEventListener('click', async () => {
      FavoriteMovieIdb.deleteRestaurant(this._restaurant.id);
      this.render();
    });
  }
}
customElements.define('add-to-favorite-button', AddToFavoriteBtn);
