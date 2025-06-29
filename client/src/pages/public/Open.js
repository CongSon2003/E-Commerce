import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header} from '../../component/public';
const Open = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <Header />
      <div className='w-full flex justify-center flex-col'>
        <Outlet />
      </div>
      <Footer/>
    </div>
    
  )
}
//absolute bg-[#4c4c4c] top-0 left-0 right-0 bottom-0 z-30
export default Open
