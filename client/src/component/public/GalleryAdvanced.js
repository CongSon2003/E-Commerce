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
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819' className='w-full object-contain' alt=''/>
          </div>
          <div className=''>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662' className='w-full object-contain' alt=''/>
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