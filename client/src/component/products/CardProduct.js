import React, { memo } from "react";
import { capitalizeFirstLetter, fomantMoney, renderStarProduct } from "../../ultils/helper";
import { Link } from "react-router-dom";

const CardProduct = ({ data }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-5">
      <div className="flex p-[15px] border w-full gap-5">
        <div className="w-[30%]">
          <img src={data?.thumb} className="w-full object-contain cursor-pointer" alt="" />
        </div>
        <div className="flex flex-col gap-2 items-start text-sm w-[70%]">
          <Link to={`/products/${data.category}/${data._id}/${data.slug}`} className="line-clamp-2 hover:text-main cursor-pointer text-[#2b3743]">
            {capitalizeFirstLetter(data?.title)}
          </Link>
          <div className="flex">
            {renderStarProduct(data?.totalRatings || 1)?.map(
              (star) => star
            )}
          </div>
          <span className="text-[#333]">{fomantMoney(data?.price)} VND</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CardProduct);
