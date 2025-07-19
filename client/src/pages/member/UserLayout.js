import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { UserSideBar } from 'component/sideBar'
import path from 'ultils/path';
const UserLayout = () => {
  const { isLoggedIn } = useSelector(state => state.userReducer);
  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN_URL}`} replace = {true}/>
  }
  return (
    <div className='flex w-full'>
        <div className='w-full flex justify-end'>
          <UserSideBar/>
          <div className='w-[84%] flex bg-[#EFEEEA] min-h-screen'>
            <Outlet/>
          </div>
        </div>
      </div>
  )
}

export default UserLayout