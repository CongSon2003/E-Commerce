import React, { memo } from "react";

const SelectOption = ({icon}) => {
  return (
    <div className="w-[40px] h-[40px] flex items-center cursor-pointer hover:border-none justify-center rounded-full border shadow-sm bg-white hover:text-white hover:bg-[#2a2a2a]">
      {icon}
    </div>
  );
};

export default memo(SelectOption);
