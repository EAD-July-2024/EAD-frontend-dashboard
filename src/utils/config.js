// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
const BACKEND_API_URL = "http://localhost:5033";

// Auth
export const AUTH_URLS = {
  LOGIN_URL: `${BACKEND_API_URL}/api/auth/login`,
};

// Product
export const PRODUCT_URLS = {
  PRODUCT_CREATE_URL: `${BACKEND_API_URL}/api/product`,
  PRODUCT_GET_ALL_URL: `${BACKEND_API_URL}/api/product`,
  PRODUCT_GET_BY_ID_URL: `${BACKEND_API_URL}/api/product`,
};

export default BACKEND_API_URL;

//FCM Token
export const FCM_URLS = {
  FCM_TOKEN_CREATE_URL: `${BACKEND_API_URL}/api/fcm-token/store`,
};
