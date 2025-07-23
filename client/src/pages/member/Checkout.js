/* eslint-disable react-hooks/exhaustive-deps */
import { Confetti, PayPal } from 'component/common';
import React, { useEffect, useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { EstimatedTaxes, exchangeRate } from 'ultils/contant';
import { VND } from '../../ultils/helper'
import currency from 'currency.js';
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import withBase from 'HOCS/withBase';
import { getCurrentUser } from 'store/user/asyncUserAction';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import Swal from 'sweetalert2';
const Checkout = ({dispatch, navigate}) => {
  const { currentCart, currentUser } = useSelector(state => state.userReducer);
  const { register, watch, reset } = useForm();
  const [isShowCardOrPayPal, setIsShowCardOrPayPal] = useState(false);
  const [isSuccessPayOrder, setIsSuccessPayOrder] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if ((currentCart.length > 0 && !isSuccessPayOrder)) {
      setSubtotal(currentCart?.reduce((sum,el) => sum += +el.priceChanged, 0))
    }
  }, [currentCart, subtotal])
  useEffect(() => {
    if (subtotal > 0 && !isSuccessPayOrder) {
      setTotal((subtotal + +EstimatedTaxes.find(item => item.currency === 'VND').Tax));
    }
  }, [subtotal]);
  useEffect(() => {
    if (watch('address')?.length > 0 && subtotal > 0) {
      setIsShowCardOrPayPal(false)
    } else {
      setIsShowCardOrPayPal(true)
    }
  },[watch('address')])
  useEffect(() => {
    if (currentUser) {
      reset({
        address : currentUser.address || ''
      })
    }
  },[currentUser]);
  useEffect(() => {
    if (isSuccessPayOrder) {
      dispatch(getCurrentUser())
      setSubtotal(0);
      setTotal(0);
      setIsShowCardOrPayPal(true);
      Swal.fire({
        icon : 'success',
        title : 'Congrat!',
        text : 'You have successfully placed your order.',
        timer: 10000, // Thời gian hiển thị (3000 milliseconds = 3 seconds)
        timerProgressBar: true, // Hiển thị thanh tiến trình cho timer
      }).then(() => {
        navigate('/')
      })
    }
  }, [isSuccessPayOrder])
  return (
    <div className='w-full flex flex-col justify-center overflow-x-hidden'>
      {isSuccessPayOrder && <Confetti />}
      <div className='w-full flex justify-center'>
        <div className='w-main'>
          <div className='grid grid-cols-2'>
            <div className='col-span-1 p-[38px] border-r min-h-screen'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-5'>
                  <div className='flex items-center gap-2'>
                    <span onClick={() => window.history.back()} className='hover:bg-gray-400 hover:text-white text-black w-8 h-8 rounded-full flex justify-center items-center cursor-pointer'>
                      <FaArrowLeft size={16}/>
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='shadow-sm bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                        <FaRegCreditCard size={18} color=''/>
                      </span>
                      <p>{`${currentUser?.firstname} ${currentUser?.lastname}`}</p>
                    </div>
                  </div>
                  <PayPal 
                    amount={currency(total).multiply(exchangeRate).value} 
                    isShowCardOrPayPal={isShowCardOrPayPal}
                    setIsSuccessPayOrder = {setIsSuccessPayOrder}
                    payload={{customerId : currentUser._id, products : currentCart, total, paymentMethod: 'paypal', address : watch('address')?.length > 0 && watch('address')}} 
                  />
                </div>
                <div className='border-t row-span-5'>
                  <span className='text-xs text-[#0000008F]'>All rights reserved Digital World 2</span>
                </div>
              </div>
            </div>
            
            <div className='col-span-1 p-[38px] bg-[#fafafa]'>
              <div className='flex items-center w-full justify-between border-b'>
                <h2 className='font-semibold uppercase text-xl py-2'>Payment order</h2>
                <Link to={`/${path.PAGE_CART_URL}`}><FaShoppingBag className='text-blue-500' size={20}/></Link>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col overflow-auto h-[350px]'>
                  {currentCart?.map(item => (
                    <div key={item._id} className='flex items-center py-2'>
                      <div className='relative'>
                        <img src={item.thumb} alt='' className='w-[64px] h-[64px] object-cover inline-block rounded-lg'/>
                        <div className='flex justify-center absolute bg-red-100 text-sm w-5 h-5 rounded-full items-center top-[-8px] right-[-8px]'>
                          <span>{item.quantity}</span>
                        </div>
                      </div>
                      <div className='w-full pl-[14px] flex justify-between'>
                        <div>
                          <p>{item.product.title}</p>
                          <p className='text-sm text-[#0000008F] capitalize'>{item.color}</p>
                        </div>
                        <span className='font-medium text-sm'>{`${VND.format(item.priceChanged)}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center justify-between'>
                    <span>{`Subtotal · ${currentCart?.reduce((sum, el) => sum += Number(el.quantity),0)} items`}</span>
                    <span className='font-medium text-sm'>{`${VND.format(subtotal)}`}</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='address' className='flex justify-between'>
                      <span>Shipping</span>
                      {!watch('address') && <span className='italic text-sm text-main'>Please enter shipping address</span>}
                    </label>
                    <input id='address' {...register('address')} type='text' autoComplete='address-level1' className='pl-2 placeholder-slate-400 border w-full p-2' placeholder='Enter shipping address here'/>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Estimated taxes</span>
                    <span className='font-medium text-sm'>{`${total > 0 ? EstimatedTaxes.find(item => item.currency === 'VND').Tax : 0} VND`}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-xl'>Total</span>
                    <div className=''>
                      <span className='text-xs uppercase text-[#0000008F]'>VND</span>
                      <span className='font-medium ml-1 text-2xl'>{`${VND.format(total)}`}</span> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withBase(Checkout)