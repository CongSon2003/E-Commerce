/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import withBase from "HOCS/withBase";
import React, { memo, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { updateCart } from "store/user/userSlice";
const SelectQuantity = ({ cart, type, defaultQuantity = 1, handleGetQuantity, dispatch}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const handleKeyPress = (e) => {
    if (!/[\d]/.test(e.key) && e.key !== 'Bankspace'){
      e.preventDefault()
    }
  }
  const handleMinus = () => {
    if (+quantity <= 1) {
      return
    }
    setQuantity(prev => +prev - 1)
  }
  const handleOnQuantity = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value)
    }
  }
  useEffect(() => {
    // Nấy giá trị của quantity cho detailProduct
    handleGetQuantity && handleGetQuantity(quantity)
    // Khi quantity thay đổi thì dispatch redux để lưu vào redux store
    dispatch(updateCart({...cart, quantity}))
  }, [quantity])
  return (
    <div className="flex items-center"> 
      {type !== 'quantityCart' && <label className="flex-3 font-semibold" htmlFor="select_Quantity">Quantity</label>}
      <div className={clsx(type === 'quantityCart' ? "flex items-center h-[30px] w-fit" : "flex flex-7 items-center gap-2 text-sm")}>
        <button onClick={() => handleMinus()} className={clsx( type === 'quantityCart' ? "cursor-pointer h-full bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7" : "cursor-pointer bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7 h-7")}>< FaMinus/></button>
        <input type="text" id="select_Quantity" value={quantity} onChange={(e) => handleOnQuantity(e)} onKeyPress={e => handleKeyPress(e)} className={type === 'quantityCart' ? "outline-none h-full text-center w-14 bg-[#f6f6f6] border-l-[1px] border-solid border-black border-r-[1px]" : "outline-none py-2 text-center w-16 bg-[#f6f6f6] border-l-2 border-solid border-black border-r-2"}/>
        <button onClick={() => setQuantity(prev => +prev + 1)} className={clsx( type === 'quantityCart' ? "cursor-pointer h-full bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7" : "cursor-pointer bg-[#f6f6f6] text-center flex justify-center items-center hover:bg-[#474747] hover:text-white w-7 h-7")}>< FaPlus/></button>
      </div>
    </div>
  );
};

export default withBase((memo(SelectQuantity)));
