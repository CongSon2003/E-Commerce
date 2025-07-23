import { EffectZoomAnimate } from 'component/common'
import React, { memo, useState } from 'react'

const GalleryAdvanced = () => {
  const [arrayIsHover, setArrayIsHover] = useState([
    {
      id : 1,
      value : 1
    },
    {
      id : 2,
      value : 1
    },
    {
      id : 3,
      value : 1
    },
    {
      id : 4,
      value : 1
    }
  ]);
  return (
    <div className='w-full mt-[-20px]'>
      <div className='flex gap-5'>
        <div onMouseMove={() => setArrayIsHover(prev => prev.map(item => item.id === 1 ? {...item, value : 2} : item))} onMouseLeave={() => setArrayIsHover((prev) => prev.map(item => item.id === 1 ? {...item, value : 3} : item))} className='w-1/2 flex relative'> 
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661' className=' w-full object-cover cursor-pointer' alt=''/>
          <EffectZoomAnimate isHover={arrayIsHover.find(item => item.id === 1).value}/>
        </div>
        <div className='w-1/4 flex flex-col gap-5'>
          <div onMouseMove={() => setArrayIsHover(prev => prev.map(item => item.id === 2 ? {...item, value : 2} : item))} onMouseLeave={() => setArrayIsHover((prev) => prev.map(item => item.id === 2 ? {...item, value : 3} : item))} className='w-full relative'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819' className='w-full object-contain cursor-pointer' alt=''/>
            <EffectZoomAnimate isHover={arrayIsHover.find(item => item.id === 2).value}/>
          </div>
          <div onMouseMove={() => setArrayIsHover(prev => prev.map(item => item.id === 3 ? {...item, value : 2} : item))} onMouseLeave={() => setArrayIsHover((prev) => prev.map(item => item.id === 3 ? {...item, value : 3} : item))} className='w-full relative'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662' className='w-full object-contain cursor-pointer' alt=''/>
            <EffectZoomAnimate isHover={arrayIsHover.find(item => item.id === 3).value}/>
          </div>
        </div>
        <div onMouseMove={() => setArrayIsHover(prev => prev.map(item => item.id === 4 ? {...item, value : 2} : item))} onMouseLeave={() => setArrayIsHover((prev) => prev.map(item => item.id === 4 ? {...item, value : 3} : item))} className='w-1/4 relative'> 
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661' className='w-full object-contain cursor-pointer' alt=''/>
          <EffectZoomAnimate isHover={arrayIsHover.find(item => item.id === 4).value}/>
        </div>
      </div>
    </div>
  )
}

export default memo(GalleryAdvanced)