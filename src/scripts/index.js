import 'regenerator-runtime'; /* for async await transpile */
import '../styles/scss/style.scss';
import './components/card-hover';
import './components/review-card';
import './components/add-to-favorite-btn';
import './components/loader-status';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu-btn'),
  drawer: document.querySelector('#navigation-drawer'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
