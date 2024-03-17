import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  REVIEW: `${CONFIG.BASE_URL}/review`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  IMAGE: {
    SMALL: (id) => `${CONFIG.BASE_IMAGE_URL}/small/${id}`,
    MEDIUM: (id) => `${CONFIG.BASE_IMAGE_URL}/medium/${id}`,
    LARGE: (id) => `${CONFIG.BASE_IMAGE_URL}/large/${id}`,
  },
};

export default API_ENDPOINT;
