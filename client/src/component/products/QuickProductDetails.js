import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fomantMoney } from 'ultils/helper';
import { SelectQuantity } from 'component/search';
import Slider from 'react-slick';
import { TiDeleteOutline, TiTick } from "react-icons/ti";
import { showModal } from 'store/app/appSlice';
import withBase from 'HOCS/withBase';
import clsx from 'clsx';
import 'animate.css';
import { useSelector } from 'react-redux';
const QuickProductDetails = ({Product, dispatch}) => {
  const [selectImg, setSelectImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState("");
  const { isShowModel } = useSelector(state => state.appReducer);
  var settings_Detail = {
    dots: false, // Hiện điểm chỉ báo
    infinite: true, // Cho phép lặp lại
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Bật tự động cuộn
    autoplaySpeed: 3000, // Thời gian giữa các lần cuộn
  };
  useEffect(() => {
    if (varriant) {
      setCurrentProduct(prev => ({...prev,
        price : +Product?.varriants?.find(item => item.sku === varriant)?.price,
        color : Product?.varriants?.find(item => item.sku === varriant)?.color,
        images : Product.varriants.find(item => item.sku === varriant)?.images,
      }))
      setSelectImg(Product.varriants.find(item => item.sku === varriant)?.thumb)
    } else {
      if (Product) {
        setSelectImg(Product?.thumb)
      }
    }
  }, [varriant, Product]);
  useEffect(() => {
    if (Product) {
      setCurrentProduct(Product);
    }
  },[Product])
  const handleQuantity = useCallback((value) => {
    setQuantity(value)
  },[]);
  console.log(isShowModel);
  return (
    <div onClick={(e) => e.stopPropagation()} className={`bg-white w-1/2 h-fit relative animate__fadeIn animate__animated`}>
      <div className='flex p-[20px]'>
        <div className='flex-1 flex flex-col gap-2'>
          <img src={selectImg} alt='QuickThumb' className='w-[360px] max-h-[360px] object-contain'/>
          <div className='w-[360px]'>
            <Slider {...settings_Detail} className='QuickImages'>
              {currentProduct?.images?.map((img) => (
                <img src={img} alt='QuickImages' onClick={() => setSelectImg(img)} className='object-cover w-[90px] h-[90px] cursor-pointer'/>
              )) }
            </Slider>
          </div>
        </div>
        <div className='pl-[20px] flex flex-col gap-[15px] flex-1'>
          <h3 className='font-semibold text-xl mb-[5px]'>
            <Link>{currentProduct?.title}</Link>
          </h3>
          <ul>
            {currentProduct?.description?.length > 1 && currentProduct?.description.map((item, index) => (
              <li className='flex items-center gap-2 text-[#505050] leading-6' key={index}>
                <FaSquare size={5}/>
                <span>{item}</span>
              </li>
            ))}
            {currentProduct?.description?.length === 1 && <div className='line-clamp-[10' dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(currentProduct?.description[0])}}></div>}
          </ul>
          <span className='font-semibold text-2xl'>{`${fomantMoney(currentProduct?.price)} VND`}</span>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <h4 className='font-semibold flex-3'>Color</h4>
              <div className='flex flex-wrap gap-2 flex-8'>
                <div onClick={() => setVarriant(null)} className={clsx(`relative flex items-center border p-2 cursor-pointer hover:border-red-500 gap-2 hover:text-red-500`, varriant === null && 'border-red-500 text-red-500')}>
                  <img src={Product?.thumb} alt='' className='w-10 h-10 object-contain'/>
                  <span className='flex flex-col'>
                    <span className='uppercase'>{Product?.color}</span>
                  </span>
                  {varriant === null && <div className='absolute triangle-bottomright bottom-0 right-0'><TiTick className='absolute right-[-3px] top-[5px]' color='white'/></div>}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {currentProduct?.varriants?.map(item => (
                    <div key={item.sku} onClick={() => setVarriant(item.sku)} className={clsx(`relative flex items-center border p-2 cursor-pointer hover:border-red-500 gap-2 hover:text-red-500`, varriant === item?.sku && 'border-red-500 text-red-500')}>
                      <img src={item?.thumb} alt='' className='w-10 h-10 object-contain'/>
                      <span className='flex flex-col'>
                        <span>{item?.color}</span>
                    </span>
                      {item?.sku === varriant && <div className='absolute triangle-bottomright bottom-0 right-0'><TiTick className='absolute right-[-3px] top-[5px]' color='white'/></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SelectQuantity quantity={quantity} handleQuantity={handleQuantity}/>
          <button type='button' className='py-[11px] px-[15px] bg-main text-white hover:bg-[#474747]'>ADD TO CART</button>
        </div>
      </div>
      <TiDeleteOutline className='absolute right-1 top-1 cursor-pointer' onClick={() => dispatch(showModal({isShowModel : 3, dataModel : null}))} size={25}/>
    </div>
  )
}

export default withBase(memo(QuickProductDetails))