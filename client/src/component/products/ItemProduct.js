import React, { memo, useEffect, useState } from "react";
import { fomantMoney } from "../../ultils/helper";
import newLabel from '../../assets/new.png';
import trendingLabel from '../../assets/trending.png';
import { SelectOption } from "../search";
import { FaHeart, FaSquare } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { renderStarProduct, capitalizeFirstLetter } from "../../ultils/helper";
import { Link } from "react-router-dom";
import clsx from "clsx";
import withBase from "HOCS/withBase";
import { showModal, wishList } from "store/app/appSlice";
import { FaCheck } from "react-icons/fa";
import QuickProductDetails from "./QuickProductDetails";
import DOMPurify from 'dompurify';
import { useSelector } from "react-redux";
import { apiUpdateCartUser } from '../../apis'
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import path from "ultils/path";
import { getCurrentUser } from "store/user/asyncUserAction";
const ItemProduct = ({ itemProductData, isNew, normal, type, navigate, dispatch }) => {
  const [hoverSelectOption, SetHoverSelectOption] = useState(false);
  const [hoverSelect, setHoverSelect] = useState(1);
  const { wishListLocal } = useSelector(state => state.appReducer);
  const { isLoggedIn, currentUser } = useSelector(state => state.userReducer);
  const [isCheckCart, setIsCheckCart] = useState(false);
  const handleAddCart = async () => {
    if (!isLoggedIn && !currentUser) {
      navigate(`/${path.LOGIN_URL}`)
    }
    if (!isCheckCart) {
      const result = await apiUpdateCartUser({ productId : itemProductData?._id, color : itemProductData?.color, quantity : 1, thumb : itemProductData?.thumb});
      if (result.success) {
        dispatch(getCurrentUser())
      }
    } 
  }
  // py-[10px]
  useEffect(() => {
    if (isLoggedIn && currentUser){
      setIsCheckCart(currentUser?.cart?.some(item => item.product._id === itemProductData._id))
    }
  },[currentUser, isLoggedIn, itemProductData])
  return (
    <div className="text-base w-full px-[10px] py-[10px] font-[Poppins]">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          SetHoverSelectOption(true);
          setHoverSelect(2);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          SetHoverSelectOption(false);
          setHoverSelect(3)
        }}
        className="w-full relative border p-[15px] flex flex-auto flex-col justify-center bg-white"
      >
        <div className="w-full mb-[20px] relative">
          { type !== 'NewArrivals' && 
            <div
              className={`absolute flex gap-3 bottom-0 justify-center w-full ${hoverSelect === 2 ? "animate-slide-top" : hoverSelect === 3 ? "animate-slide-out-bottom" : "opacity-0"}`}
            >
              <button onClick={() => dispatch(wishList({thumb : itemProductData.thumb, price : itemProductData.price, title : itemProductData.title, category: itemProductData.category, slug : itemProductData.slug, _id : itemProductData._id}))}><SelectOption icon={wishListLocal?.some(item => item._id === itemProductData._id) ? <FaCheck/> : <FaHeart/>}/></button>
              <button title="a" onClick={() => handleAddCart()} className="border-none outline-none"><SelectOption icon={isCheckCart ? <BsCartCheckFill/> : <BsFillCartPlusFill />} /></button>
              <button onClick={() => dispatch(showModal({ isShowModel : 2, dataModel : <QuickProductDetails Product = {itemProductData}/>}))} className="border-none outline-none"><SelectOption icon={<FaEye/>}/></button>
            </div>
          }
          <Link
            to={`/products/${itemProductData?.category?.toLowerCase()}/${
              itemProductData?._id
            }/${itemProductData?.slug}`}
            className={'flex justify-center'}
          >
            <img
              src={itemProductData?.thumb}
              className={clsx(type === 'NewArrivals' ? "max-h-[345px] w-full object-cover cursor-pointer outline-none" : "max-h-[250px] w-full object-cover cursor-pointer")}
              alt=""
            />
          </Link> 
          <div className="right-0 absolute top-0">
            <img src={!isNew ? newLabel : trendingLabel} alt="" className="h-[26px] w-fit"/>
          </div>
        </div>
        <div className="flex flex-col gap-[6px] items-start">
          <Link className="line-clamp-1 hover:text-main cursor-pointer">
            {capitalizeFirstLetter(itemProductData?.title)}
          </Link>
          <div className="flex">
            {renderStarProduct(itemProductData?.totalRatings)?.map(
              (star) => star
            )}
          </div>
          <span>{fomantMoney(itemProductData?.price)} VND</span>
        </div>
        {(type === 'NewArrivals' && hoverSelectOption) && <div className="absolute bg-white inset-0">
          <div className="flex justify-between border-b px-5 pb-[10px] items-center">
            <Link className="text-[#2B3743] flex-1">{itemProductData?.title}</Link>
            <span className="text-[#2B3743] text-lg line-clamp-1 flex-1 text-center">{`${fomantMoney(itemProductData?.price)} VND`}</span>
          </div>
          <div className="py-[10px] px-[20px] flex flex-col gap-3 h-[280px] overflow-auto">
            <ul className="">
              {itemProductData?.description?.length > 1 && itemProductData?.description.map((item, index) => (
                <li className='flex items-center gap-2 text-[#505050] leading-6' key={index}>
                  <FaSquare size={5}/>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {itemProductData?.description?.length === 1 && <div className='line-clamp-[10' dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(itemProductData?.description[0])}}></div>}
            </ul>
          </div>
        </div>}
        {(type === 'NewArrivals') && <div
            // 
          className={`flex gap-3 justify-start absolute left-[20px] bottom-[110px] ${
            hoverSelectOption
              ? "animate-slide-top"
              : "animate-slide-out-bottom"
          } w-full `}
          >
          <button onClick={() => dispatch(wishList({thumb : itemProductData.thumb, price : itemProductData.price, title : itemProductData.title, category: itemProductData.category, slug : itemProductData.slug, _id : itemProductData._id}))}><SelectOption icon={wishListLocal?.some(item => item._id === itemProductData._id) ? <FaCheck/> : <FaHeart/>}/></button>
          <button onClick={() => navigate(`/products/${itemProductData?.category}/${itemProductData?._id}/${itemProductData?.slug}`)} className="border-none outline-none"><SelectOption icon={<IoMenu size={20} />} /></button>
          <button onClick={() => dispatch(showModal({ isShowModel : true, dataModel : <QuickProductDetails Product = {itemProductData}/>}))} className="border-none outline-none"><SelectOption icon={<FaEye/>}/></button>
        </div>}
      </div>
    </div>
  );
};

export default withBase(memo(ItemProduct))
