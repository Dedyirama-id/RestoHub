import 'regenerator-runtime'; /* for async await transpile */
import '../styles/scss/style.scss';
import '../scripts/components/card-hover';
import scrollToElement from '../scripts/utils/scroll-to';

let restaurantData = [];

const targetElement = document.getElementById('restaurant-list');
const header = document.querySelector('header');
const menu = document.querySelector('#menu-btn');
const ctaButton = document.getElementById('cta-button');
const restaurantList = document.getElementById('restaurant-list');
const searchForm = document.querySelector('.search-bar');

const showRestaurantList = (data) => {
  restaurantCardContainer.innerHTML = '';
  data.forEach((restaurant) => {
    const card = document.createElement('card-hover');
    card.data = restaurant;
    restaurantCardContainer.appendChild(card);
  });
};

const filterData = (data, query) => {
  const q = query.toLowerCase();
  const filteredData = data.filter((d) => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q));
  return filteredData;
};

menu.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('open');
  const menuIcon = menu.querySelector('img');
  (nav.classList.contains('open')) ? menuIcon.src = './icons/xmark.svg' : menuIcon.src = './icons/menu.svg';
});

ctaButton.addEventListener('click', () => scrollToElement(targetElement, header, 16));

const restaurantCardContainer = restaurantList.querySelector('.card-container');

fetch('./data/DATA.json').then((response) => {
  if (!response.ok) {
    throw new Error('Error while accessing DATA.json');
  }
  return response.json();
}).then((data) => {
  restaurantData = data.restaurants;
  showRestaurantList(data.restaurants);
}).catch((error) => console.error('Fetch error:', error));

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = searchForm.searchInput.value;
  const filteredData = filterData(restaurantData, searchValue);
  showRestaurantList(filteredData);
});
