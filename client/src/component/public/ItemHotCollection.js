import React, { memo } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { lowercaseLetters } from 'ultils/helper';
const ItemHotCollection = ({data, index}) => {
  return (
    <div className={`w-1/3 px-[10px] ${index <= 2 ? 'mb-5' : ''}`}>
      <div className='border flex flex-auto p-[15px]'>
        <div className='w-[50%] text-center'>
          <img src={data.image} className='object-contain' alt=''/>
        </div>
        <div className='w-[50%] flex flex-col pl-[20px] gap-2'>
          <div className='uppercase font-semibold text-[#505050]'>{data?.title}</div>
          <ul>
            { data?.brand?.map((el, index) => {
            return (
              <li key={index} className='flex flex-initial items-center hover:text-main cursor-pointer gap-1 mb-[5px] text-[#808080] text-sm'>
                <FaAngleRight/>
                <Link to={`/products/${lowercaseLetters(data.title)}/${lowercaseLetters(el)}`}>{el}</Link>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default memo(ItemHotCollection)