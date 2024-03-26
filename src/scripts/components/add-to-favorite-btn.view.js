const addToFavoriteBtnView = {
  createStyleTemplate() {
    return `
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

        button:focus {
          outline: 4px solid orange;
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
    `;
  },

  createFavoriteButtonTemplate() {
    return `
        <button class="add-to-favorite">
          <span>Add to Favorite</span>
          <img src="./svg/heart-regular.svg" alt="Favorite button">
        </button>
    `;
  },

  createFavoritedButtonTemplate() {
    return `
        <button class="add-to-favorite">
          <span>Remove</span>
          <img src="./svg/heart-solid.svg" alt="Favorite button">
        </button>
    `;
  },
};

export default addToFavoriteBtnView;
