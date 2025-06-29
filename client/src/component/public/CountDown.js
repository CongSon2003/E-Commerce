import React, { memo } from 'react'

const CountDown = ({time, unit}) => {
  return (
    <div className='py-[10px] px-[5px] bg-[#f4f4f4] w-[30%]'>
      <span className='flex flex-col'>
        <span className='text-[18px] font-semibold'>{time}</span>
        <span className='text-[#8b8b8b] text-sm'>{unit}</span>
      </span>
    </div>
  )
}

export default memo(CountDown)