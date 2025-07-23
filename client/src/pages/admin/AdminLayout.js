import { AdminSideBar } from 'component/sideBar'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import path from 'ultils/path'

const Admin = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/${path.ADMIN_URL}`) {
      navigate(`/admin/${path.DASHBOARD_URL}`)
    }
  },[navigate, pathname])
  return (
      <div className='flex w-full'>
        <div className='w-full flex justify-end'>
          <AdminSideBar/>
          <div className='w-[84%] flex min-h-screen bg-[#EFEEEA]'>
            <Outlet/>
          </div>
        </div>
      </div>
    )
}

export default Admin