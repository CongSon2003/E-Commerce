import React, { Fragment, useState } from 'react'
import logo from '../../assets/logo_digital_new_250x.png'
import { userSideBar } from 'ultils/contant'
import { NavLink } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import clsx from 'clsx'
import path from 'ultils/path';
const activeStyle = 'px-4 py-2 flex items-center gap-2 bg-gray-200 text-black'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:text-main'
const AdminSideBar = () => {
  const [isClickManagerProducts, setIsClickManagerProducts] = useState(false);
  
  return (
    <div className='bg-white text-black flex min-h-screen w-[16%] flex-col py-4 fixed left-0 top-0 z-50'>
      <div className='flex flex-col text-center items-center gap-2 p-4'>
        <img src={logo} alt='' className='object-contain w-[200px]'/>
        <h3 className='font-semibold'>Member Workspace</h3>
      </div>
      <div className='flex flex-col'>
        { userSideBar.map(item => (
          <Fragment key={item.id}>
            { item.type === 'single' && <NavLink to={item.path} className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle)} >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>}
            { item.type === 'parent' && <div className='flex flex-col'>
                <div onClick={() => setIsClickManagerProducts(prev => !prev)} className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:text-main'>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                  { isClickManagerProducts ? <FaAngleUp className='mt-1 ml-4'/> : <FaAngleDown className='mt-1 ml-4'/>}
                </div>
                { isClickManagerProducts && <div className='flex flex-col px-6 py-2'>
                  { item.submenu.map(el => (
                    <NavLink key={el.text} to={el.path} className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}>
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </NavLink>
                  ))}
                </div>}
              </div>}
          </Fragment>
        ))}
        <NavLink className='px-4 py-2 flex items-center gap-2 hover:text-main' to={`/${path.HOME_URL}`} >
          <MdExitToApp/>
          <span>Exit</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSideBar