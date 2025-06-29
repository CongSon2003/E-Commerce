import React, { memo, useState } from "react";
import { fomantMoney } from "../../ultils/helper";
import label_blue from "../../assets/bannel_blue_nobg.png";
import label_red from "../../assets/bannel_red_nobg.png";
import { SelectOption } from "../search";
import { FaHeart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { renderStarProduct, capitalizeFirstLetter } from "../../ultils/helper";
import { Link } from "react-router-dom";
const ItemProduct = ({ itemProductData, isNew, normal }) => {
  const [hoverSelectOption, SetHoverSelectOption] = useState(false);
  return (
    <div className="text-base w-full px-[10px]">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          SetHoverSelectOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          SetHoverSelectOption(false);
        }}
        className="w-full border p-[15px] flex flex-auto flex-col justify-center"
      >
        <div className="w-full mb-[20px] relative">
          {
            <div
              className={`absolute flex gap-3 bottom-0 justify-center w-full ${
                hoverSelectOption
                  ? "animate-slide-top"
                  : "animate-slide-out-bottom"
              }`}
            >
              <SelectOption icon={<FaHeart />} />
              <SelectOption icon={<IoMenu size={20} />} />
              <SelectOption icon={<FaEye />} />
            </div>
          }
          <Link
            to={`/products/${itemProductData?.category?.toLowerCase()}/${
              itemProductData?._id
            }/${itemProductData?.slug}`}
          >
            <img
              src={itemProductData?.thumb}
              className="w-full object-contain cursor-pointer outline-none"
              alt=""
            />
          </Link>
          {!normal && (
            <img
              src={isNew ? label_blue : label_red}
              alt=""
              className="w-[90px] h-[50px] object-cover top-[-16px] left-[-26px] absolute"
            />
          )}
          <span
            className={`uppercase font-bold text-xs text-white absolute top-0 ${
              isNew ? "left-[-10px]" : "left-0"
            } text-center`}
          >
            {isNew ? "TRENDING" : "DEAL"}
          </span>
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
      </div>
    </div>
  );
};

export default memo(ItemProduct);
