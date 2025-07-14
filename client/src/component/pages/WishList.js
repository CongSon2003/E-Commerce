import { Breadcrumb } from "component/common";
import React from "react";
import { useSelector } from "react-redux";
import { fomantMoney } from "ultils/helper";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import withBase from "HOCS/withBase";
import { removeWishList } from "store/app/appSlice";
const WishList = ({dispatch}) => {
  const { wishListLocal } = useSelector(state => state.appReducer);
  return (
    <div className="flex flex-col w-full gap-5">
      <Breadcrumb title={"Wish list"} />
      <div className="flex justify-center w-full">
        <div className="w-main">
          <table class="table-auto border w-full">
            <thead>
              <tr className="border uppercase">
                <th className='px-4 py-2 text-[#505050]'>#</th>
                <th className='px-4 py-2 text-center text-[#505050] font-normal'>Images</th>
                <th className='px-4 py-2 text-center text-[#505050] font-normal'>Name</th>
                <th className='px-4 py-2 text-center text-[#505050] font-normal'>Price</th>
                <th className='px-4 py-2 text-center text-[#505050] font-normal'>Remove</th>
                <th className='px-4 py-2 text-center text-[#505050] font-normal'>Detail</th>
              </tr>
            </thead>
            <tbody>
              {wishListLocal?.map((item,index)=> (
                <tr key={index} className="border">
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 text-center flex justify-center'>
                    <img src={item.thumb} alt="" className="w-36 h-36 object-cover"/>
                  </td>
                  <td className='px-4 py-2 text-center text-[#1C1D1D] hover:text-main'>
                    <Link to={`/products/${item?.category}/${item?._id}/${item?.slug}`}>{item?.title}</Link>
                  </td>
                  <td className='px-4 py-2 text-center text-[#505050]'>{`${fomantMoney(item?.price)} VND`}</td>
                  <td className='px-4 py-2 text-center'><FaTimes onClick={() => dispatch(removeWishList({_id : item._id}))} className="inline-block cursor-pointer hover:text-main"/></td>
                  <td className='px-4 py-2 text-center'>
                    <Link to={`/products/${item?.category}/${item?._id}/${item?.slug}`} className="hover:text-main text-[#1C1D1D]">View More</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withBase(WishList);
