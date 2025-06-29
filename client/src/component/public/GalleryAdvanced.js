import React, { memo } from 'react'

const GalleryAdvanced = () => {
  return (
    <div className='w-full mt-[-20px]'>
      <div className='flex gap-5'>
        <div className='w-1/2 flex '> 
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661' className=' w-full object-cover' alt=''/>
        </div>
        <div className='w-1/4 flex flex-col gap-5'>
          <div className=''>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661' className='w-full object-contain' alt=''/>
          </div>
          <div className=''>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661' className='w-full object-contain' alt=''/>
          </div>
        </div>
        <div className='w-1/4'> 
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661' className='w-full object-contain' alt=''/>
        </div>
      </div>
    </div>
  )
}

export default memo(GalleryAdvanced)