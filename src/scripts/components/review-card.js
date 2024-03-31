import createAvatarWithSeed from '../utils/avatar-maker';

class ReviewCard extends HTMLElement {
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
    this._name = data.name;
    this._review = data.review;
    this._date = data.date;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = this._getStyleTemplate();
    if (this._name) {
      this._renderReview();
    } else {
      this._renderSkeleton();
    }
  }

  _renderSkeleton() {
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="avatar skeleton">
        </div>
        <div class="review-content">
          <h2 class="skeleton">lorem</h2>
          <p class="review skeleton">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p class="date skeleton">01 Januari 2020</p>
        </div>
      </div>
    `;
  }

  _renderReview() {
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="avatar">
          ${createAvatarWithSeed(this._name)}
        </div>
        <div class="review-content">
          <h2>${this._name}</h2>
          <p class="review">${this._review}</p>
          <p class="date">${this._date}</p>
        </div>
      </div>
    `;
  }

  _getStyleTemplate() {
    return `
      <style>
        :host {
          display: block;
          min-width: 100px;
          width: 100%;
        }
          
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .avatar.skeleton {
          border: none;
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

        .card {
          width: 100%;
          border-radius: 8px;
          align-items: center;
          display: flex;
          flex-direction: column;
          padding: 8px;
          gap: 16px;
          min-width: fit-content;
        }

        .card:hover {
          background-color: #f0f0f0;
        }

       .avatar {
          aspect-ratio: 1;
          background-color: #f0f0f0;
          border-radius: 50%; 
          border: 1px solid black;
          flex-shrink: 0;
          min-width: 64px;
          min-height: 64px;
        }

        .review-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          gap: 6px;
          height: fit-content;
        }

        .review {
          flex-shrink: 1;
          overflow-wrap: break-word;
          height: fit-content;
        }
        
        h2 {
          font-size: clamp(1rem, 0.45vw + 0.89rem, 1.25rem);
        }

        p {
          font-size:  clamp(0.8rem, 0.25vw + 0.74rem, 0.94rem);
        }

        .date {
          font-size: clamp(0.8rem, 0.25vw + 0.74rem, 0.94rem);
        }

        @media screen and (min-width: 380px) {
          .card {
            flex-direction: row;
          }

          .avatar {
            width: 80px;
            height: 80px;
          }

          .review-content {
            align-items: flex-start;
            justify-content: space-between;
            text-align: left;
          }
        }

        @media screen and (min-width: 768px) {
          :host {
            width: calc(50% - 16px);
          }
        }
      </style>
    `;
  }
}
customElements.define('review-card', ReviewCard);
