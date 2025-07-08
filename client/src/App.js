import React, { useEffect } from "react";
import Path from "./ultils/path";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Open } from "./pages/public";
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
import { MyCart, Personal, PurchaseHistory, UserLayout, WishList } from './pages/member'
function App() {
  const dispatch = useDispatch();
  const { isShowModel, dataModel } = useSelector(state => state.appReducer);
  useEffect(() => {
    // Fetch product categories when the app loads
    dispatch(getProductCategories());
    dispatch(getNewProducts());
  }, [dispatch]);
  return (
    <div className="min-h-screen relative">
      {isShowModel && <Modal children={dataModel}></Modal>}
      <Routes>
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
          <Route element={<AccountRegister />} path={Path.ACCOUNT_REGISTER} />
          <Route path={Path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
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
          <Route path={Path.WISHLIST_URL} element={<WishList/>}/>
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
