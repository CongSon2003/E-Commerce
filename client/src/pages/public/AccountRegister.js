import React, { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import Swal from 'sweetalert2';
const AccountRegister = () => {
  const { status } = useParams();
  useEffect(() => {
    if (status === 'failed') {
      Swal.fire({
        title:"Oops...",
        text: "Register failed!",
        icon: "error"
      })
    }
    if (status === 'success') {
      Swal.fire({
        title:"Good job!",
        text: "Register success",
        icon: "success"
      })
    }
    
  }, [status])
  return (
    <Navigate to={`/${path.LOGIN_URL}`} state={status}/>
  )
}

export default AccountRegister