import React, { memo, useEffect, useRef } from 'react'
import { IoMdStar } from "react-icons/io";
const VoteBar = ({star, countRatings, number, ratingsTotal}) => {
  const progressRef = useRef(null);
  useEffect(() => {
    const percent = Math.round((countRatings * 100/ratingsTotal)) || 0;
    progressRef.current.style.cssText = `right : ${100 - percent}%`
  },[ratingsTotal, countRatings]);
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center text-sm'>
        <span>{number}</span>
        <IoMdStar color="orange" size={15} />
      </div>
      <div className='w-full flex-8 bg-slate-200 h-2 rounded-md relative'>
        <div ref={progressRef} className='bg-[#db0519] h-2 rounded-md absolute inset-0'></div>
      </div>
      <div className='text-sm flex flex-2 items-center gap-1'>
        <span>{countRatings || 0}</span>
        <span>Evaluate</span>
      </div>
    </div>
  )
}

export default memo(VoteBar)