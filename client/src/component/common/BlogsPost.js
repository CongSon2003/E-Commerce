import React, { memo } from 'react'
const BlogsPost = () => {
  return (
    <div className='flex flex-col w-full gap-5'>
      <header className='border-b-2 border-solid border-[#ee3131] text-[20px]'>
        <h2 className='uppercase py-[15px] font-semibold'>Blog posts</h2>
      </header>
      <div className='flex flex-wrap mx-[-10px]'>
        {/* <Slider { ...settings }>
        </Slider> */}
      </div>
    </div>
  )
}

export default memo(BlogsPost);