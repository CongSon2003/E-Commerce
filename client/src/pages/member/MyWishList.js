import withBase from "HOCS/withBase";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeWishList } from "store/app/appSlice";
import { fomantMoney } from "ultils/helper";

const MyWishList = ({dispatch}) => {
  const { wishListLocal } = useSelector((state) => state.appReducer);
  return (
    <div className="w-full p-5">
      <header className="border-b border-black pb-4 mb-4">
        <h1 className="uppercase text-2xl font-medium">WhisList</h1>
      </header>
      <div>
        <table class="table-auto border w-full bg-white">
          <thead>
            <tr className="border uppercase">
              <th className="px-4 py-2 text-[#505050]">#</th>
              <th className="px-4 py-2 text-center text-[#505050] font-normal">
                Images
              </th>
              <th className="px-4 py-2 text-center text-[#505050] font-normal">
                Name
              </th>
              <th className="px-4 py-2 text-center text-[#505050] font-normal">
                Price
              </th>
              <th className="px-4 py-2 text-center text-[#505050] font-normal">
                Remove
              </th>
              <th className="px-4 py-2 text-center text-[#505050] font-normal">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListLocal?.map((item, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center flex justify-center">
                  <img
                    src={item.thumb}
                    alt=""
                    className="w-36 h-36 object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-center text-[#1C1D1D] hover:text-main">
                  <Link
                    to={`/products/${item?.category}/${item?._id}/${item?.slug}`}
                  >
                    {item?.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-center text-[#505050]">{`${fomantMoney(
                  item?.price
                )} VND`}</td>
                <td className="px-4 py-2 text-center">
                  <FaTimes
                    onClick={() => dispatch(removeWishList({ _id: item._id }))}
                    className="inline-block cursor-pointer hover:text-main"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/products/${item?.category}/${item?._id}/${item?.slug}`}
                    className="hover:text-main text-[#1C1D1D]"
                  >
                    View More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withBase(MyWishList);
