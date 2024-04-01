import API_ENDPOINT from '../globals/api-endpoint';

class CardHover extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    this.render();
  }

  set data(data) {
    this._id = data.id;
    this._name = data.name;
    this._description = (data.description.length <= 100) ? data.description : `${data.description.slice(0, 100)}...`;
    this._pictureId = data.pictureId;
    this._city = data.city;
    this._rating = data.rating.toFixed(2);
    this.render();
  }

  get id() {
    return this._id;
  }

  get showedName() {
    return this._shadowRoot.querySelector('.restaurant-item__name').textContent;
  }

  render() {
    this._shadowRoot.innerHTML = this._getStyleTemplate();

    if (this._id) {
      this._renderRestaurant();
    } else {
      this._renderSkeleton();
    }
  }

  _renderSkeleton() {
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="skeleton main-img"></div>
        <div class="text-content">
          <h2 class="skeleton">Lorem Ipsum</h2>
          <p class="skeleton">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nulla ratione consequuntur quas porro odit vero illo aspernatur impedit natus.</p>
        </div>
        <ul class="tag-container">
          <li class="skeleton-tag skeleton ">lorem</li>
          <li class="skeleton-tag skeleton">lorem</li>
        </ul>

      </div>
    `;
  }

  _renderRestaurant() {
    this._shadowRoot.innerHTML += `
      <div id="${this._id}" tabindex="0" aria-label="${this._name || '-'}}" class="card">
        <img loading="lazy" width="100%" src="${API_ENDPOINT.IMAGE.SMALL(this._pictureId)}" alt="${this._name || '-'} image" class="main-img">
        <div class="text-content">
          <h2 class="restaurant-item__name name">${this._name || '-'}</h2>
          <p class="desc">${this._description}</p>
        </div>
        <ul class="tag-container">
          <li class="tag">${this._city}</li>
          <li class="tag"><img src="svg/star.svg" alt="Star icon" class="star"> ${this._rating}</li>
        </ul>
      </div>
    `;
  }

  _getStyleTemplate() {
    return `
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

        @keyframes pulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .skeleton {
          background-color: #f0f0f0;
          animation: pulse 1s ease-in-out infinite alternate;
          -webkit-animation: pulse 1s ease-in-out infinite alternate;
          border-radius: 2px;
          color: transparent;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
        }

        .skeleton-tag {
          border: 1px #f0f0f0 solid;
        }

        .main-img {
          width: 100%;
          object-fit: cover;
          border-radius: 16px;
          border-radius: 1rem;
          aspect-ratio: 5/3;
          box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 2px 0px rgba(0, 0, 0, 0.13), 0px 4px 2px 0px rgba(0, 0, 0, 0.08), 0px 7px 3px 0px rgba(0, 0, 0, 0.02), 0px 10px 3px 0px rgba(0, 0, 0, 0.00);
          background-color: #f0f0f0;
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
    `;
  }
}
customElements.define('card-hover', CardHover);
