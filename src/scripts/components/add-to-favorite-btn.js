import FavoriteMovieIdb from '../data/favorite-restaurant-idb';
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

  async render() {
    const { id } = this._restaurant;
    this._shadowRoot.innerHTML = addToFavoriteBtnView.createStyleTemplate();

    if (await addToFavoriteBtnLogic.isRestaurantExist(id)) {
      this._shadowRoot.innerHTML += addToFavoriteBtnView.createFavoritedButtonTemplate();
      this.setAttribute('aria-label', 'remove from favorite');
      this._shadowRoot.querySelector('button').addEventListener('click', async () => {
        await FavoriteMovieIdb.deleteRestaurant(id);
        this.render();
      });
    } else {
      this._shadowRoot.innerHTML += addToFavoriteBtnView.createFavoriteButtonTemplate();
      this.setAttribute('aria-label', 'add to favorite');
      this._shadowRoot.querySelector('button').addEventListener('click', async () => {
        await FavoriteMovieIdb.putRestaurant(this._restaurant);
        this.render();
      });
    }
  }
}
customElements.define('add-to-favorite-button', AddToFavoriteBtn);
