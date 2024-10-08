const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
// const BACKEND_API_URL = "http://localhost:5033";

// Auth
export const AUTH_URLS = {
  LOGIN_URL: `${BACKEND_API_URL}/api/auth/login`,
  REGISTER_URL: `${BACKEND_API_URL}/api/auth/register`,
};

// User
export const USER_URLS = {
  USER_GET_CUSTOMERS_URL: `${BACKEND_API_URL}/api/auth/customers`,
};

// Product
export const PRODUCT_URLS = {
  PRODUCT_CREATE_URL: `${BACKEND_API_URL}/api/product`,
  PRODUCT_GET_ALL_URL: `${BACKEND_API_URL}/api/product`,
  PRODUCT_GET_BY_ROLE_URL: `${BACKEND_API_URL}/api/product/getByRole`,
  PRODUCT_GET_BY_ID_URL: `${BACKEND_API_URL}/api/product`,
  PRODUCT_UPDATE_URL: `${BACKEND_API_URL}/api/product/update`,
  PRODUCT_DELETE_URL: `${BACKEND_API_URL}/api/product/productDelete`,
};

//FCM Token
export const FCM_URLS = {
  FCM_TOKEN_CREATE_URL: `${BACKEND_API_URL}/api/fcm-token/store`,
};

// Order
export const ORDER_URLS = {
  ORDER_CREATE_URL: `${BACKEND_API_URL}/api/order`,
  ORDER_GET_ALL_URL: `${BACKEND_API_URL}/api/order`,
  ORDER_GET_BY_ID_URL: `${BACKEND_API_URL}/api/order`,
  ORDER_UPDATE_URL: `${BACKEND_API_URL}/api/order/update`,
  ORDER_DELETE_URL: `${BACKEND_API_URL}/api/order/orderDelete`,
};

//Category
export const CATEGORY_URLS = {
  CATEGORY_CREATE_URL: `${BACKEND_API_URL}/api/category`,
  CATEGORY_GET_ALL_URL: `${BACKEND_API_URL}/api/category`,
  CATEGORY_GET_BY_ID_URL: `${BACKEND_API_URL}/api/category`,
  CATEGORY_UPDATE_URL: `${BACKEND_API_URL}/api/category/`,
  CATEGORY_DELETE_URL: `${BACKEND_API_URL}/api/category/`,
};

//Vendor
export const VENDOR_URLS = {
  VENDOR_GET_ALL_URL: `${BACKEND_API_URL}/api/vendor/Allvendors`,
  VENDOR_GET_BY_ID_URL: `${BACKEND_API_URL}/api/vendor`,
};

export default BACKEND_API_URL;
