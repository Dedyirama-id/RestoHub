import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

const { default: DrawerInitiator } = require('../utils/drawer-initiator');

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = '';
    const loaderStatus = document.createElement('loader-status');
    this._content.appendChild(loaderStatus);
    try {
      loaderStatus.renderLoad();
      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLinkElement = document.querySelector('#skip-to-content');
      skipLinkElement.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main-content').focus();
      });
    } catch (error) {
      loaderStatus.error = error;
    }
  }
}

export default App;
