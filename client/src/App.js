import React, { useEffect } from "react";
import Path from "./ultils/path";
import { Route, Routes } from "react-router-dom";
import { AboutUs, Brand, Cart, Faq, Heading, Home, Login, Open, Services, Typography } from "./pages/public";
import { getProductCategories } from "./store/app/asyncAppAction";
import { getNewProducts } from "./store/products/asyncProductsAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from './component'
import {
  Blogs,
  DetailProduct,
  Products,
  NotFound,
  AccountRegister,
  ResetPassword,
  ProductAll
} from "./pages/public";
import { ToastContainer } from "react-toastify";
import { AdminLayout, Dashboard, ManagerOrder, ManagerProduct,  CreatedProducts, ManagerUsers, UpdateProduct, ProductVarriantions } from "pages/admin";
import { Checkout, MyCart, Personal, PurchaseHistory, UserLayout, MyWishList } from './pages/member'
import { RightCart, WishList } from './component/pages'
import { showRightCart } from "store/app/appSlice";

function App() {
  const dispatch = useDispatch();
  const { isShowModel, dataModel, isShowRightCart } = useSelector(state => state.appReducer);
  useEffect(() => {
    // Fetch product categories when the app loads
    dispatch(getProductCategories());
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <div className="relative">
      {
        <>
          <div onClick={() => dispatch(showRightCart({isShowRightCart : 3}))} className={`absolute inset-0 bg-[#0000004D] z-40 ${(isShowRightCart === 3 || isShowRightCart === 1) && 'hidden'}`}></div>
          <div className="absolute right-[400px] top-0 bottom-0 z-50">
            <RightCart/>
          </div>
        </>
      }
      {isShowModel !== 1 && <Modal children={dataModel}></Modal>}
      <Routes>
        <Route path={Path.CHECKOUT_URL} element = {<Checkout/>}/>
        <Route path={Path.PUBLIC_URL} element={<Open />}>
          <Route path={Path.HOME_URL} element={<Home />} />
          <Route path={Path.LOGIN_URL} element={<Login />} />
          <Route path={Path.BLOGS_URL} element={<Blogs />} />
          <Route path={Path.PRODUCTS} element={<Products />} />
          <Route path = {Path.PRODUCTS_ALL_URL} element={<ProductAll/>}/>
          <Route
            path={Path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path = {Path.PAGE_ABOUT_US_URL} element={<AboutUs/>}/>
          <Route path = {Path.PAGE_FAQ_URL} element={<Faq/>}/>
          <Route path = {Path.PAGE_HEADING_URL} element={<Heading/>}/>
          <Route path = {Path.PAGE_SERVICES_URL} element={<Services/>}/>
          <Route path = {Path.PAGE_TYPOGRAPHY_URL} element={<Typography/>}/>
          <Route path = {Path.PAGE_WISHLIST_URL} element={<WishList/>}/>
          <Route element={<AccountRegister />} path={Path.ACCOUNT_REGISTER} />
          <Route path={Path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route path={Path.PAGE_CART_URL} element={<Cart/>} />
          <Route path={Path.CATEGORY_BRAND_URL} element={<Brand/>}/>
        </Route>
        <Route path= {Path.ADMIN_URL} element = {<AdminLayout/>}>
          <Route path={Path.DASHBOARD_URL} element= {<Dashboard/>}/>
          <Route path = {Path.MANAGER_ORDERS} element = {<ManagerOrder/>}/>
          <Route path={Path.MANAGER_PRODUCTS_URL} element = {<ManagerProduct/>} />
          <Route path={Path.CREATE_PRODUCT} element = {<CreatedProducts/>}/>
          <Route path={Path.MANAGER_USERS_URL} element = {<ManagerUsers/>}/>
          <Route path={Path.UPDATE_PRODUCT} element = {<UpdateProduct/>}/>
          <Route path={Path.PRODUCT_VARIATIONS} element = {<ProductVarriantions/>}/>
        </Route>
        <Route path={Path.MEMBER_URL} element = {<UserLayout/>}>
          <Route path={Path.PERSONAL_URL} element = {<Personal/>}/>
          <Route path={Path.MYCART_URL} element= {<MyCart/>}/>
          <Route path={Path.PURCHASE_HISTORY_URL} element= {<PurchaseHistory/>}/>
          <Route path={Path.WISHLIST_URL} element={<MyWishList/>}/>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default App;
