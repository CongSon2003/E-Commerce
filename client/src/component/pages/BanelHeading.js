import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
const BanelHeading = ({ panelTitle, panelBody }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex flex-col font-[Poppins]">
      <div onClick={() => setIsActive(prev => !prev)} className={` ${isActive && 'bg-main text-white' } flex items-center justify-between py-[15px] px-[20px] border cursor-pointer`}>
        <span className="hover:text-main">{panelTitle || ""}</span>
        {!isActive ? <FiPlus size={20} className="text-[#505050]"/> : <FiMinus size={20} className="text-[#505050]"/>}
      </div>
      {isActive && <div className="p-5 bg-white border mt-[-1px] text-sm text-[#505050]">{panelBody || ""}</div>}
    </div>
  );
};

export default BanelHeading;
