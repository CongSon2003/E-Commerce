import { apiRemoveProductInCartUser, apiUpdateCartUser } from '../../apis';
import { Breadcrumb } from 'component'
import { SelectQuantity } from 'component/search';
import withBase from 'HOCS/withBase';
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUser } from 'store/user/asyncUserAction';
import { fomantMoney } from 'ultils/helper';
import path from 'ultils/path';
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const Cart = ({dispatch}) => {
  const { isLoggedIn, currentUser, currentCart } = useSelector(state => state.userReducer);
  let [loading, setLoading] = useState(false);
  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN_URL}`} replace = {true}/>
  }
  const handleRemoveCartInUser = async (cartId) => {
    const result = await apiRemoveProductInCartUser(cartId);
    if (result?.success) {
      toast.success('Cart deleted successfully')
      dispatch(getCurrentUser());
    } else {
      toast.error('Removed failed')
    }
  }
  const handleUpdateCart = async () => {
    setLoading(true);
    console.log(currentCart);
    const result = await apiUpdateCartUser({currentCart, isUpdateCart : true})
    if (result.success) { 
      dispatch(getCurrentUser());
      toast.success('Update cart user successfully')
    }
    setLoading(false)
    console.log(result);
  }
  console.log(currentCart);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className="flex flex-col w-full gap-5">
      <Breadcrumb title={"Cart"} />
      <div className="flex justify-center w-full">
        <div className="w-main">  
          <div className='grid grid-cols-10 uppercase font-medium border py-[15px] px-[20px]'>
            <span className='col-span-6 text-center'>Products</span>
            <span className='col-span-1 text-center'>Quantity</span>
            <span className='col-span-3 text-end'>Total</span>
          </div>
          {currentUser?.cart.map((item, index) => (
            <div key={index} className='py-[15px] px-[20px] border-x border-b items-center grid grid-cols-10'>
              <div className='flex items-center gap-5 col-span-6'>
                <img src={item.thumb} alt='' className='w-44 h-44 object-contain'/>
                <div>
                  <Link to={`/products/${item.product.category}/${item.product._id}/${item.product.slug}`}>{item.product.title}</Link>
                  <p className='text-[#505050] capitalize'>{item.color}</p>
                  <span onClick={() => handleRemoveCartInUser(item._id)} className='hover:text-red-500 cursor-pointer'>Remove</span>
                </div>
              </div>
              <div className='col-span-1 text-center'>
                <SelectQuantity cart={item} defaultQuantity={item.quantity} type={'quantityCart'}/>
              </div>
              <span className='col-span-3 text-end text-xl font-semibold text-[#333333]'>{`${fomantMoney(item.priceChanged)} VND`}</span>
            </div>
          ))}
          <div className='grid grid-cols-10 py-[15px] px-[20px] border-x border-b overflow-auto'>
            <div className='col-span-7'></div>
            <div className='col-span-3'>
              <div className='grid grid-cols-5 mb-3'>
                <p className='text-[#505050] col-span-3'>Subtotal</p>
                <span className='text-xl font-semibold text-[#333333] col-span-2 text-end'>{`${fomantMoney(currentUser?.cart?.reduce((sum,el) => sum += +el.priceChanged,0))} VND`}</span>
              </div>
              <p className='text-[#505050] mb-3 italic text-end'>Shipping, taxes, and discounts calculated at checkout.</p>
              <div className='flex justify-end gap-3 text-sm'>
                <button onClick={() => handleUpdateCart()} className='flex items-center gap-2 relative justify-center text-white bg-black py-[11px] px-[15px] rounded'>
                  Updated Cart
                  <ClipLoader
                    color={'#fff'}
                    loading={loading}
                    cssOverride={override}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className='absolute'
                  />
                </button>
                <Link to={`/${path.CHECKOUT_URL}`} className='flex items-center gap-2 text-white bg-main py-[11px] px-[15px]'>
                  <span>Check out</span>
                  <FaArrowRightLong/>
                </Link>
              </div>
            </div>
          </div>
          <p className='bg-black text-white w-full rounded py-[3px] px-[10px] my-[5px]'>
            All orders are processed in USD. While the content of your cart is currently displayed in VND, you will checkout using USD at the most current exchange rate.
          </p>
        </div>
      </div>
    </div>
  )
}

export default withBase(Cart)