/* eslint-disable no-unused-expressions */
class CardHover extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open',
    });
    this._id;
    this._name;
    this._description;
    this._pictureId;
    this._city;
    this._rating;
  }

  connectedCallback() {
    this.render();
  }

  set data(data) {
    this._id = data.id;
    this._name = data.name;
    this._description = data.shortDescription;
    this._pictureId = data.pictureId;
    this._city = data.city;
    this._rating = data.rating;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: block;
        }

        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        .card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          height: 100%;
          padding: 8px;
          border-radius: 16px;
          border: solid transparent 2px;
        }

        .main-img {
          width: 100%;
          object-fit: cover;
          border-radius: 16px;
          border-radius: 1rem;
          aspect-ratio: 5/3;
          box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 2px 0px rgba(0, 0, 0, 0.13), 0px 4px 2px 0px rgba(0, 0, 0, 0.08), 0px 7px 3px 0px rgba(0, 0, 0, 0.02), 0px 10px 3px 0px rgba(0, 0, 0, 0.00);
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-grow: 1;
        }

        .name {
          font-size: clamp(1.25rem, 0.76vw + 1.06rem, 1.67rem);
          margin: 0;
        }

        .desc {
          font-size: clamp(0.8rem, 0.25vw + 0.74rem, 0.94rem);
          margin: 0;
        }

        .tag-container {
          display: flex;
          gap: 8px;
          padding: 0;
          margin: 0;
        }

        .tag {
          display: flex;
          align-items: center;
          justify-items: center;
          gap: 4px;
          list-style: none;
          width: fit-content;
          border-radius: 80px;
          border: solid black 1px;
          padding: 2px 8px;
          font-size: clamp(0.8rem, 0.25vw + 0.74rem, 0.94rem);
          font-weight: bolder;
        }

        .card:hover, .card:focus {
          transition: ease-in 0.2s;
          cursor: pointer;
          border: solid black 2px;
          outline-color: orange;
        }

        .card:hover .main-img, .card:focus .main-img {
          transition: ease-in 0.2s;
          border-radius: 1rem;
          box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.15), 10px 12px 15px 0px rgba(0, 0, 0, 0.13), 23px 26px 21px 0px rgba(0, 0, 0, 0.08), 41px 47px 25px 0px rgba(0, 0, 0, 0.02), 64px 73px 27px 0px rgba(0, 0, 0, 0.00);
        }

        .star {
          aspect-ratio: 1;
          height: 100%;
          background-color: none;
        }

        @media screen and (min-width: 768px) {
          .card {
            padding: 12px;
            gap: 24px;
            border: solid transparent 3px;
          }

          .card:hover, .card:focus {
            border: solid black 3px;
            outline-color: orange;
          }

          .tag {
            padding: 4px 16px;
            gap: 8px;
          }
        }
      </style>

      <div id="${this._id}" tabindex="0" aria-label="${this._name}" class="card">
        <img src="${this._pictureId}" alt="${this._name} image" class="main-img">
        <div class="text-content">
          <h2 class="name">${this._name}</h2>
          <p class="desc">${this._description}</p>
        </div>
        <ul class="tag-container">
          <li class="tag">${this._city}</li>
          <li class="tag"><img src="icons/star.svg" alt="Star icon" class="star"> ${this._rating}</li>
        </ul>
      </div>
    `;
  }
}
customElements.define('card-hover', CardHover);
