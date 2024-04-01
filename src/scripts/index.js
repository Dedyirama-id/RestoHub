import 'regenerator-runtime'; /* for async await transpile */
import '../styles/scss/style.scss';
import './components/card-hover';
import './components/review-card';
import './components/add-to-favorite-btn';
import './components/loader-status';
import { initializeApp } from 'firebase/app';
import App from './views/app';
import swRegister from './utils/sw-register';
import firebaseConfig from './routes/firebase-config';

// eslint-disable-next-line no-unused-vars
const fbApp = initializeApp(firebaseConfig);

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
