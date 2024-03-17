import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import RestaurantList from '../views/pages/restaurant-list';

const routes = {
  '/': RestaurantList, // default page
  '/restaurant-list': RestaurantList,
  '/favorite': Favorite,
  '/detail/:id': Detail,
  '/detail': Detail,
};

export default routes;
