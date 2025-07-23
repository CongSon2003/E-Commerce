import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header} from '../../component/public';
const Open = () => {
  return (
    <div className='flex flex-col gap-5 overflow-auto h-screen'>
      <Header />
      <div className='w-full flex flex-col'>
        <Outlet />
      </div>
      <Footer/>
    </div>
    
  )
}
//absolute bg-[#4c4c4c] top-0 left-0 right-0 bottom-0 z-30
export default Open
