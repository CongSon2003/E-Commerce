import React, { memo } from 'react'

const Banner = () => {
  return (
    <div className='w-full'>
      <img src='https://digital-world-2.myshopify.com/cdn/shop/files/slideshow3-home2_1920x.jpg?v=1613166679' alt='banner' className='w-full h-[470px] object-cover' />
    </div>
  )
}

export default memo(Banner)