/* eslint-disable no-unused-expressions */
class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open',
    });
    this._name;
    this._review;
    this._date;
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
          max-width: 600px;
          min-width: 300px;
          flex: 1 1 0;
        }
          
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .card {
          border-radius: 8px;
          align-items: center;
          gap: 16px;
          display: flex;
          padding: 8px;
        }

        .card:hover {
          cursor: pointer;
          background-color: #f0f0f0 
        }
        
        .avatar {
          background-color: black;
          height: 80px;
          aspect-ratio: 1/1;
          border-radius: 800px;
        }
        
        .review-content {
          flex-shrink: 1;
          display: flex;
          flex-direction: column;
          align-self: stretch;
          justify-content: sace-between;
          gap: 6px;
        }

        .review {
          display: inline-block;
          flex-grow: 1;
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
      </style>

      <div class="card">
        <img src="./images/logo.png" alt="" class="avatar">
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
