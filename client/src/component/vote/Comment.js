import React, { memo } from "react";
import avatar from "../../assets/avatarDef.png";
import moment from "moment";
import { renderStarProduct } from "../../ultils/helper";
const Comment = ({
  name = "Anonymous",
  comment,
  img = avatar,
  updatedAt,
  star,
}) => {
  return (
    <div className="flex flex-col p-4 gap-3">
      <div className="flex gap-2 items-center">
        <div className="flex-none">
          <img
            src={img}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3>{name || ""}</h3>
            <span className="text-sm text-gray-500 italic">
              {moment(updatedAt)?.fromNow()}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 border py-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">Vote : </span>
          <div className="flex items-center">
            {renderStarProduct(star)?.map((star) => star)}
          </div>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Comment: </span>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
