import { apigetProducts } from 'apis'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { VND } from 'ultils/helper';

const SuggestProduct = ({handleShowSuggestProduct, isShowSuggestProduct}) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fectchApiGetProduct = async () => {
      const number = Math.round(Math.random() * 10);
      console.log(number);
      const result = await apigetProducts({limit : 1});
      console.log(result);
      if (result.success) {
        setProduct(result.response[0]);
      }
    };
    fectchApiGetProduct()
  },[])
  return (
    <div onClick={() => handleShowSuggestProduct(3)} className={`fixed bottom-[15px] left-0 p-5 bg-white z-50 shadow-suggest-product font-[Poppins] ${isShowSuggestProduct % 2 === 0 ? 'animate-slide-top' : isShowSuggestProduct % 2 !== 0 ? 'animate-fade-out-bottom' : 'invisible'}`}>
      <div className='uppercase text-[#505050] mb-[15px] text-[16px]'>
        Other customers also viewed
      </div>
      <div className='flex items-center gap-5'>
        <img src={product?.thumb} alt='' className='w-[100px] h-[100px] object-cover'/>
        <div className='flex flex-col gap-2'>
          <Link to={`/products/${product?.category}/${product?._id}/${product?.slug}`} className='font-normal text-[#1c1d1d] hover:text-main'>{product?.title}</Link>
          <span className='text-sm text-[#333]'>{VND.format(product?.price)}</span>
        </div>
      </div>
    </div>
  )
}

export default SuggestProduct