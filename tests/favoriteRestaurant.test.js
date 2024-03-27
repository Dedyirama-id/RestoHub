/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/*
  Test Scenario
  * Menyukai Film.
    * Film belum disukai.
    * Widget untuk menyukai film ditampilkan.
    * Widget menyukai film ditekan oleh pengguna.
    * Film ditambahkan ke daftar film yang disukai.
      * Film berhasil ditambahkan.
      * Ternyata film sudah disukai.
        * Tidak perlu menyimpan kembali.
      * Data film tidak memiliki ID.
        * Sistem tidak memproses penyimpanan.
        * Sistem tidak gagal.
  * Batal Menyukai Film.
    * Film sudah disukai.
    * Widget untuk batal menyukai film ditampilkan.
    * Widget pembatalan ditekan oleh pengguna.
    * Film dihapus dari daftar film yang disukai.
      * Film berhasil dihapus.
      *Ternyata film tidak ada dalam daftar film yang disukai.

  TODO: Memberi nama yang lebih berbeda untuk createFavoriteButtonTemplate
  TODO: Alur negatif: sistem tidak memproses penyimpanan dan menyebabkan kegagalan jika menyimpan restaurant tanpa ID.
*/

import '../src/scripts/components/add-to-favorite-btn';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favoriting A Restaurant', () => {
  const addFavoriteButton = async () => {
    const addRestaurantToFavoriteBtn = document.createElement('add-to-favorite-button');
    document.body.appendChild(addRestaurantToFavoriteBtn);
    addRestaurantToFavoriteBtn.restaurant = { id: 1 };
    await addRestaurantToFavoriteBtn.render();
  };

  beforeEach(async () => {
    await addFavoriteButton();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    expect(document.querySelector('[aria-label="add to favorite"]')).toBeTruthy();
  });

  it('should not show the unfavorite button when the restaurant has not been favorited before', async () => {
    expect(document.querySelector('[aria-label="remove from favorite"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    const addRestaurantToFavoriteBtn = document.querySelector('add-to-favorite-button');
    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add the restaurant again when it already exists in the favorite', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    const addRestaurantToFavoriteBtn = document.querySelector('add-to-favorite-button');
    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).not.toEqual([{ id: 1 }]);
  });

  xit('should not add the restaurant when it has no id', async () => {
    const addRestaurantToFavoriteBtn = document.createElement('add-to-favorite-button');
    document.body.appendChild(addRestaurantToFavoriteBtn);
    addRestaurantToFavoriteBtn.restaurant = {};
    addRestaurantToFavoriteBtn.render();

    addRestaurantToFavoriteBtn.dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
