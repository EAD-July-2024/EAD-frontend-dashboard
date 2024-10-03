const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

// Auth
export const AUTH_URLS = {
  LOGIN_URL: `${BACKEND_API_URL}/login`,
};

// Product
export const PRODUCT_URLS = {
  PRODUCT_CREATE_URL: `${BACKEND_API_URL}/api/product/create`,
  PRODUCT_GET_ALL_URL: `${BACKEND_API_URL}/api/product/get`,
  PRODUCT_GET_BY_ID_URL: `${BACKEND_API_URL}/api/product/get`,
};

export default BACKEND_API_URL;
