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
    this._shadowRoot.innerHTML = `
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
          background-color: black;
          border-radius: 50%; 
          flex-shrink: 0;
          min-width: 64px;
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
}
customElements.define('review-card', ReviewCard);
