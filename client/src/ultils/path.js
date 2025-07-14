const path = {
  PUBLIC_URL: '/',
  HOME_URL: '',
  ALL_URL: "*",
  LOGIN_URL: "login",
  ACCOUNT_REGISTER : "accountRegister/:status",
  RESET_PASSWORD : 'reset-password/:resetToken',
  PRODUCTS_ALL_URL : "products",
  PRODUCTS : 'products/:category',
  BLOGS_URL : 'blogs',
  OUR_SERVISES_URL : 'our-services',
  FAQ_URL : 'faq',
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: 'products/:category/:productId/:title',
  DETAIL_PRODUCT : 'products',
  PAGE_WISHLIST_URL : 'wish-list',
  PAGE_CART_URL : 'cart',

  // ADMIN : 
  ADMIN_URL : 'admin',
  DASHBOARD_URL : 'dash-board',
  MANAGER_PRODUCTS_URL : 'manager-products',
  MANAGER_USERS_URL : 'manager-users',
  MANAGER_ORDERS : 'manager-orders',
  CREATE_PRODUCT : 'create-product',
  UPDATE_PRODUCT : 'update-product/:productId',
  PRODUCT_VARIATIONS : 'manager-products/product-varriations/:productId',

  // MEMBER
  MEMBER_URL : 'member',
  PERSONAL_URL : 'personal',
  WISHLIST_URL : 'whishlist',
  PURCHASE_HISTORY_URL : 'perchase-history',
  MYCART_URL : 'my-cart',

  CHECKOUT_URL : 'checkout',
};

export default path;
