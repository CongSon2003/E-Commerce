import withBase from 'HOCS/withBase';
import React, { memo, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { showRightCart } from '../../store/app/appSlice'
import { useSelector } from 'react-redux';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { fomantMoney } from 'ultils/helper';
import { FaArrowRightLong } from "react-icons/fa6";
import { apiRemoveProductInCartUser } from '../../apis';
import { getCurrentUser } from 'store/user/asyncUserAction';
import path from 'ultils/path';
const RightCart = ({dispatch, navigate}) => {
  const { currentUser } = useSelector(state => state.userReducer);
  const [isAlert, setIsAlert] = useState(false);
  const [totalMoney,setTotalMoney] = useState(0);
  const { isShowRightCart } = useSelector(state => state.appReducer);
  const fetApiRemoveCart = async (_id) => {
    const result = await apiRemoveProductInCartUser(_id);
    if (result.success) {
      dispatch(getCurrentUser());
    }
  }
  useEffect(() => {
    if (isAlert) {
      alert('Only one item is added to your shopping cart due to its usability.')
    }
  }, [isAlert])
  useEffect(() => {
    if (currentUser) {
      setTotalMoney(fomantMoney(currentUser?.cart.reduce((sum, item) => sum += item.priceChanged, 0)))
    }
  }, [totalMoney, currentUser])
  return (
    <div onClick={(e) => e.stopPropagation()} className={`bg-black h-screen ${isShowRightCart === 2 ? 'animate-slide-left' : isShowRightCart === 3 ? "animate-slide-right" : "invisible"} max-h-screen w-[400px] grid grid-rows-10 fixed text-white`}>
      <header className='border-b border-[#343535] flex justify-between items-center row-span-1 px-[30px]'>
        <h2 className='uppercase text-xl font-semibold'>your cart</h2>
        <IoMdClose size={25} className='cursor-pointer' onClick={() => dispatch(showRightCart({isShowRightCart : 3}))}/>
      </header>
      <div className='row-span-9 flex flex-col justify-between'>
        <div className='row-span-6 overflow-auto px-[30px]'>
          { currentUser?.cart.map((item, index) => (
            <div key={item._id} className='flex py-5 border-b border-[#343535]'>
              <div className='flex items-center w-full'>
                <img src={item.thumb} alt='' className='w-[80px] h-fit object-cover block'/>
                <div className='flex flex-col ml-4 w-full gap-2 relative'>
                  <p className='text-sm font-medium capitalize'>{item.product.title}</p>
                  <div onClick={() => fetApiRemoveCart(item._id)} className='absolute right-0 top-0 cursor-pointer hover:text-black p-1 hover:bg-gray-300 rounded-full'>
                    <MdDeleteForever size={20}/>
                  </div>
                  <span className='capitalize text-sm'>{item.color}</span>
                  <div className='flex justify-between w-full gap-2'>
                    <div className={`border border-[#343535] flex items-center justify-around ${isAlert && 'opacity-60'}`}>
                      <button onClick={() => setIsAlert(true)} className='flex p-1 justify-center border-r border-[#343535] w-full h-full'><FiMinus/></button>
                      <input id='QuantityRightCart' value={item.quantity} disabled type='text' className='w-7 outline-none bg-black text-center'></input>
                      <button onClick={() => setIsAlert(true)} className='w-full p-1 h-full border-l text-center border-[#343535] flex justify-center'><FiPlus/></button>
                    </div>
                    <div className='text-end flex gap-1'>
                      <span className=''>{`${fomantMoney(item.priceChanged)}`}</span>
                      <span>VND</span>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          )) }
        </div>
        <div className='row-span-3 border-t border-[#343535] pt-[15px] pb-[10px] px-[30px]'>
          <div className='grid grid-cols-3 uppercase font-medium mb-[10px]'>
            <p className='col-span-2'>Subtotal</p>
            <span className='col-span-1 text-right'>{`${totalMoney} VND`}</span>
          </div>
          <p className='text-center opacity-70 mb-[10px]'>Shipping, taxes, and discounts calculated at checkout.</p>
          <div className='w-full flex flex-col gap-[10px]'>
            <button onClick={() => {navigate(`/${path.PAGE_CART_URL}`); dispatch(showRightCart({isShowRightCart : 3})) }} className='uppercase bg-main py-[11px] px-[15px flex items-center justify-center gap-1 hover:bg-[#474747]'>
              <p>Shopping cart</p>
              <FaArrowRightLong size={12}/>
            </button>
            <button onClick={() => {navigate(`/${path.PAGE_CART_URL}`); dispatch(showRightCart({isShowRightCart : 3})) }} className='uppercase bg-main py-[11px] px-[15px flex items-center justify-center gap-1 hover:bg-[#474747]'>
              <p>Check Out</p>
              <FaArrowRightLong size={12}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withBase(memo(RightCart))