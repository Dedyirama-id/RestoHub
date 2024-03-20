class LoaderStatus extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    this.renderLoad();
  }

  set error(error) {
    this._error = error;
    this._renderError();
  }

  renderLoad() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          grid-column-start: 1;
          grid-column-end: 4;
        }

        .loader {
          height: 9px;
          width: 60px;
          --c:no-repeat linear-gradient(#000 0 0);
          background: var(--c), var(--c), var(--c), var(--c);
          background-size: 26% 3px;
          animation: l2 1s infinite;
        }
        
        @keyframes l2 {
          0%,
          70%,
          100% {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 100%,calc(2*100%/3) 100%,calc(3*100%/3) 100%}
          14%  {background-position: calc(0*100%/3) 0   ,calc(1*100%/3) 100%,calc(2*100%/3) 100%,calc(3*100%/3) 100%}
          28%  {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 0   ,calc(2*100%/3) 100%,calc(3*100%/3) 100%}
          42%  {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 100%,calc(2*100%/3) 0   ,calc(3*100%/3) 100%}
          56%  {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 100%,calc(2*100%/3) 100%,calc(3*100%/3) 0   }
        }
      </style>

      <div class="loader"></div>
    `;
  }

  _renderError() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          grid-column-start: 1;
          grid-column-end: 5;
        }

        .loader {
          padding: 2px 16px;
          border-radius: 8px;
          background-color: red;
        }

        .loader p {
          color: white;
          font-size: clamp(0.8rem, 0.25vw + 0.74rem, 0.94rem);
        }
      </style>

      <div class="loader"><p>${this._error}</p></div>
    `;
  }
}

customElements.define('loader-status', LoaderStatus);
