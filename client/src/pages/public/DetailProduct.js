import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apigetOneProduct } from '../../apis';
import { ProductInformation } from '../../component/products';
import { Breadcrumb } from '../../component/common';
import { SelectQuantity } from '../../component/search';
import {  ItemProduct } from "../../component/products"
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import { capitalizeFirstLetter, fomantMoney, renderStarProduct } from '../../ultils/helper';
import { FaReply, FaTty, FaTwitter } from 'react-icons/fa';
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoPinterest } from 'react-icons/io';
import { FaSquare } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { IoGift } from 'react-icons/io5';
import path from '../../ultils/path';
import { apigetProducts } from "../../apis";

const DetailProduct = () => {
  // eslint-disable-next-line no-unused-vars
  const {productId, title, category} = useParams();
  const [isupdate, setIsUpdate] = useState(false);
  const [product, setProduct] = useState(null);
  const [productsCategory, setProductsCategory] = useState(null);
  const [selectImg, setSelectImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    autoplaySpeed: 2000,
  };
  useEffect(() => {
    if (product) {
      setSelectImg(product.thumb)
    }
  },[product])
  useEffect(()=> {
    const fetchGetOneProduct = async () => {
      if (productId) {
        const result = await apigetOneProduct(productId);
        if (result.success) setProduct(result.response);
      }
    }
    const fetchGetProducts = async () => {
      if (productId) {
        const result = await apigetProducts({category});
        if (result.success) {
          setProductsCategory(result.response);
        }
      }
    }
    fetchGetOneProduct();
    fetchGetProducts();
    window.scrollTo(0,0)
  },[productId, category]);
  useEffect(() => {
    const fetchGetOneProduct = async () => {
      if (productId) {
        const result = await apigetOneProduct(productId);
        if (result.success) setProduct(result.response);
      }
    }
    fetchGetOneProduct();
  },[isupdate, productId])
  const handleIsUpdate = useCallback(()=> {
    setIsUpdate(!isupdate);
  },[isupdate])
  const handleQuantity = useCallback((value) => {
    setQuantity(value)
  },[]);
  return (
    <div className='w-full flex flex-col gap-5'>
      <Breadcrumb title={product?.title} category={product?.category}/> 
      <div className='w-full bg-white flex justify-center'>
        <div className='w-main flex flex-col gap-4'>
          <div className='flex flex-col gap-7'>
            <div className='flex'>
              <div className='w-2/5 flex flex-col gap-5'>
                <div className='border'>
                  <ReactImageMagnify {...{
                    smallImage: {
                      alt: '',
                      isFluidWidth: true,
                      src: selectImg,
                    },
                    largeImage: {
                      src: selectImg,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImageContainerClassName : 'enlarged-image-container',
                    enlargedImageContainerDimensions : {
                      width : '90%',
                      height: '100%'
                
                    }
                  }} />
                </div>
                <div className='w-full'>
                  <Slider {...settings} className='ProductThumbs flex gap-1'>
                    {product?.images?.map((img) => (
                      <div className='flex w-full border gap-1 cursor-pointer'>
                        <img src={`${img}`} alt='' onClick={() => setSelectImg(img)} className='object-contain h-[143px] w-[143px]'/>
                      </div>
                    )) }
                  </Slider>
                </div>
              </div>
              <div className='w-3/5 pl-[45px] flex'>
                <div className='flex flex-6 flex-col gap-3'>
                  <h3 className='font-semibold text-4xl text-[#333] mb-1'>{`${fomantMoney(product?.price)} VND`}</h3>
                  <div className="flex items-center gap-1">
                    <div className='flex items-center'>
                      {renderStarProduct(product?.totalRatings || 1)?.map(
                        (star) => star
                      )}
                    </div>
                    <span className='text-main text-sm'>{`(Sold: ${product?.sold})`}</span>
                  </div>
                  <ul>
                    {product?.description.map((item, index) => (
                      <li className='flex items-center gap-2 text-[#505050] leading-6' key={index}>
                        <FaSquare size={5}/>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center'>
                      <h4 className='flex-2 font-semibold'>Internal</h4>
                      <ul className='flex flex-8 items-center gap-2'>
                        <li className='py-[9px] px-[11px] border'>32GB</li>
                        <li className='py-[9px] px-[11px] border'>64GB</li>
                        <li className='py-[9px] px-[11px] border'>128GB</li>
                      </ul>
                    </div>
                    <div className='flex items-center'>
                      <h4 className='flex-2 font-semibold'>Color</h4>
                      <ul className='flex flex-8 items-center gap-2'>
                        <li className='py-[9px] px-[11px] border'>32GB</li>
                        <li className='py-[9px] px-[11px] border'>64GB</li>
                        <li className='py-[9px] px-[11px] border'>128GB</li>
                      </ul>
                    </div>
                    <div className='flex items-center'>
                      <h4 className='flex-2 font-semibold'>Ram</h4>
                      <ul className='flex flex-8 items-center gap-2'>
                        <li className='py-[9px] px-[11px] border'>2GB</li>
                        <li className='py-[9px] px-[11px] border'>3GB</li>
                      </ul>
                    </div>
                    <SelectQuantity quantity={quantity} handleQuantity={handleQuantity}/>
                  </div>
                  <button type='button' className='py-[11px] px-[15px] bg-main text-white hover:bg-[#474747]'>ADD TO CART</button>
                  <div className='flex items-center gap-4'>
                    <div className='w-[35px] h-[35px] bg-black flex items-center justify-center rounded-full'>
                      <FaFacebookF className="cursor-pointer" color='white' />
                    </div>
                    <div className='w-[35px] h-[35px] bg-black flex items-center justify-center rounded-full'>
                      <FaTwitter className="cursor-pointer hover:text-black" color='white'/>
                    </div>
                    <div className='w-[35px] h-[35px] bg-black flex items-center justify-center rounded-full'>
                      <IoLogoPinterest className="cursor-pointer hover:text-black" color='white' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col flex-4'>
                  <ul className='flex flex-col gap-3'>
                    <li className='border p-[10px] flex gap-2 items-center'>
                      <div className='bg-[#525252] rounded-full w-[30px] h-[30px] flex justify-center items-center'>
                        <FaShieldAlt color='white'/>
                      </div>
                      <div className='flex flex-col'>
                        <span className='capitalize text-[#505050]'>{capitalizeFirstLetter('guarantee')}</span>
                        <span className='text-[#999]'>Quality checked</span>
                      </div>
                    </li>
                    <li className='border p-[10px] flex gap-2 items-center'>
                      <div className='bg-[#525252] rounded-full w-[30px] h-[30px] flex justify-center items-center'>
                        <FaTruck color='white'/>
                      </div>
                      <div className='flex flex-col'>
                        <span className='capitalize text-[#505050]'>{capitalizeFirstLetter('Free Shipping')}</span>
                        <span className='text-[#999]'>Free on all products</span>
                      </div>
                    </li>
                    <li className='border p-[10px] flex gap-2 items-center'>
                      <div className='bg-[#525252] rounded-full w-[30px] h-[30px] flex justify-center items-center'>
                        <IoGift color='white'/>
                      </div>
                      <div className='flex flex-col'>
                        <span className='capitalize text-[#505050]'>{capitalizeFirstLetter('Special gift cards')}</span>
                        <span className='text-[#999]'>Special gift cards</span>
                      </div>
                    </li>
                    <li className='border p-[10px] flex gap-2 items-center'>
                      <div className='bg-[#525252] rounded-full w-[30px] h-[30px] flex justify-center items-center'>
                        <FaReply color='white'/>
                      </div>
                      <div className='flex flex-col'>
                        <span className='capitalize text-[#505050]'>{capitalizeFirstLetter('Free return')}</span>
                        <span className='text-[#999]'>Within 7 days</span>
                      </div>
                    </li>
                    <li className='border p-[10px] flex gap-2 items-center'>
                      <div className='bg-[#525252] rounded-full w-[30px] h-[30px] flex justify-center items-center'>
                        <FaTty color='white'/>
                      </div>
                      <div className='flex flex-col'>
                        <span className='capitalize text-[#505050]'>{capitalizeFirstLetter('Consultancy')}</span>
                        <span className='text-[#999]'>Lifetime 24/7/356</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-7'>
              <Link to={path.PUBLIC_URL} className='hover:text-main cursor-pointer uppercase'>← Back to Smartphone</Link>
            </div>
            <ProductInformation product={product} handleIsUpdate = {handleIsUpdate}/>
          </div>
          <div className='flex flex-col w-full gap-12'>
            <header className='border-b-2 border-solid border-[#ee3131] text-[20px]'>
              <h2 className='uppercase py-[15px] font-semibold text-[#505050]'>Other Customers also buy</h2>
            </header>
            <div className='flex flex-col mx-[-10px] mb-[30px]'>
              <Slider {...settings}>
                { productsCategory?.map(product => {
                  return (
                    <ItemProduct isNew={false} key={product._id} itemProductData={product} normal={true}/>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct