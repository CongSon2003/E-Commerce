import React, { memo } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const SelectQuantity = ({ quantity, handleQuantity }) => {
  console.log(quantity);
  const handleKeyPress = (e) => {
    if (!/[\d]/.test(e.key) && e.key !== 'Bankspace'){
      e.preventDefault()
    }
  }
  const handleMinus = () => {
    if (quantity <= 1) {
      return
    }
    handleQuantity(prev => prev -1)
  }
  return (
    <div className="flex items-center">
      <label className="flex-2 font-semibold" htmlFor="select_Quantity">Quantity</label>
      <div className="flex flex-8 items-center gap-2">
        <button onClick={() => handleMinus()} className="cursor-pointer bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7 h-7">< FaMinus/></button>
        <input type="text" id="select_Quantity" value={quantity} onChange={(e) => handleQuantity(e.target.value)} onKeyPress={e => handleKeyPress(e)} className="outline-none py-2 text-center w-16 bg-[#f6f6f6] border-l-2 border-solid border-black border-r-2"/>
        <button onClick={() => handleQuantity(prev => prev + 1)} className="cursor-pointer bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7 h-7">< FaPlus/></button>
      </div>
    </div>
  );
};

export default memo(SelectQuantity);
