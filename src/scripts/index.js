import 'regenerator-runtime'; /* for async await transpile */
import '../styles/scss/style.scss';
import './components/card-hover';
import scrollToElement from './utils/scroll-to';

let restaurantData = [];

const scrollTargetElement = document.getElementById('restaurant-list');
const header = document.querySelector('header');
const menu = document.querySelector('#menu-btn');
const ctaButton = document.getElementById('cta-button');
const restaurantList = document.getElementById('restaurant-list');
const searchForm = document.querySelector('.search-bar');
const restaurantCardContainer = restaurantList.querySelector('.card-container');

const showRestaurantList = (restaurants) => {
  restaurantCardContainer.innerHTML = '';
  restaurants.forEach((restaurant) => {
    const card = document.createElement('card-hover');
    card.restaurants = restaurant;
    restaurantCardContainer.appendChild(card);
  });
};

const filterData = (allData, query) => {
  const q = query.toLowerCase();
  const filteredData = allData.filter((data) => data.name.toLowerCase().includes(q) || data.city.toLowerCase().includes(q));
  return filteredData;
};

menu.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('open');
  const menuIcon = menu.querySelector('img');
  if (nav.classList.contains('open')) {
    menuIcon.src = './icons/xmark.svg';
  } else {
    menuIcon.src = './icons/menu.svg';
  }
});

ctaButton.addEventListener('click', () => scrollToElement(scrollTargetElement, header, 16));

fetch('./data/DATA.json').then((response) => {
  if (!response.ok) {
    throw new Error('Error while accessing DATA.json');
  }
  return response.json();
}).then((data) => {
  restaurantData = data.restaurants;
  showRestaurantList(data.restaurants);
}).catch((error) => console.error('Fetch error:', error));

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = searchForm.searchInput.value;
  const filteredData = filterData(restaurantData, searchValue);
  showRestaurantList(filteredData);
});
