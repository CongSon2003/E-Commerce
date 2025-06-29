import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from 'ultils/path';
const UserLayout = () => {
  const { isLoggedIn } = useSelector(state => state.userReducer);
  console.log("OOOO");
  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN_URL}`} replace = {true}/>
  }
  return (
    <div>
      <h2>LAYOUT MEMBER</h2>
      <Outlet/>
    </div>
  )
}

export default UserLayout