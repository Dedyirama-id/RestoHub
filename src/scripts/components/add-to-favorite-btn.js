import addToFavoriteBtnLogic from './add-to-favorite-btn.logic';
import addToFavoriteBtnView from './add-to-favorite-btn.view';

class AddToFavoriteBtn extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  set favoriteRestaurants(favoriteRestaurants) {
    this._favoriteRestaurants = favoriteRestaurants;
    this.render();
  }

  async render() {
    const { id } = this._restaurant;

    if (await addToFavoriteBtnLogic.isRestaurantExist(id)) {
      this._shadowRoot.innerHTML = `
        ${addToFavoriteBtnView.createStyleTemplate()}
        ${addToFavoriteBtnView.createUnfavoriteRestaurantButtonTemplate()}
      `;
      this.setAttribute('aria-label', 'remove from favorite');
      this.addEventListener('click', async () => {
        await this._favoriteRestaurants.deleteRestaurant(id);
        this.render();
      });
    } else {
      this._shadowRoot.innerHTML = `
        ${addToFavoriteBtnView.createStyleTemplate()}
        ${addToFavoriteBtnView.createFavoriteRestaurantButtonTemplate()}
      `;
      this.setAttribute('aria-label', 'add to favorite');
      this.addEventListener('click', async () => {
        await this._favoriteRestaurants.putRestaurant(this._restaurant);
        this.render();
      });
    }
  }
}
customElements.define('add-to-favorite-button', AddToFavoriteBtn);
