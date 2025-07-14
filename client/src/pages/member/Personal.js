/* eslint-disable react-hooks/exhaustive-deps */
import { apiUpdateUser } from '../../apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getCurrentUser } from 'store/user/asyncUserAction';
import { IoCreateSharp } from "react-icons/io5"
import avatardefault from '../../assets/60111.jpg'
import { fileToBase64 } from 'ultils/helper';
const Personal = () => {
  const { currentUser } = useSelector(state => state.userReducer);
  const { reset, register, handleSubmit, formState : { isDirty, errors }, watch } = useForm();
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const OnSubmit = async (data) => {
    const { role, createdAt, status, ...finalData} = data;
    console.log(finalData);
    const formData = new FormData();
    for (const element of Object.entries(finalData)) {
      formData.append(element[0], element[1]);
    }
    console.log(formData.getAll('firstname'));
    if (finalData.avatar) {
      formData.delete('avatar');
      formData.append('avatar', typeof finalData.avatar === 'object' ? finalData.avatar[0] : finalData.avatar);
    }
    setIsLoading(true);
    const result = await apiUpdateUser(formData);
    setIsLoading(false);
    console.log(result);
    if (result.success) {
      toast.success('Updated successfully!')
      dispatch(getCurrentUser());
    }
  }
  const handlePriviewAvatar = async (file) => {
    console.log(file);
    const base64Avatar = await fileToBase64(file);
    setPreviewAvatar(base64Avatar)
  }
  console.log(previewAvatar);
  useEffect(() => {
    if (currentUser) {
      reset({
        firstname : currentUser.firstname,
        lastname : currentUser.lastname,
        email : currentUser.email,
        mobile : currentUser.mobile,
        role : currentUser.role === 1945 ? 'Admin' : 'User',
        status : currentUser.isBlocked === true ? 'Blocked' : 'Active',
        createdAt : moment(currentUser.createdAt).format('DD/MM/YYYY'),
        avatar : currentUser.avatar
      })
      setPreviewAvatar(currentUser.avatar)
    }
    if (!currentUser?.avatar) {
      setPreviewAvatar(avatardefault)
    }
  }, [currentUser, reset])
  useEffect(() => {
    if (watch('avatar').length > 0) {
      console.log(typeof watch('avatar'));
      console.log( watch('avatar'));
      if (typeof watch('avatar') === 'object') {
        handlePriviewAvatar(watch('avatar')[0])
      }
    }
  },[watch('avatar')])
  return (
    <div className='p-4 relative w-full flex h-screen flex-col justify-center'>
      <header className='w-full border-b p-2 mb-6'>
        <h1 className='text-2xl font-medium uppercase'>Personal</h1>
      </header>
      <div className='flex flex-9 flex-col justify-start items-center'>
        <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-3'>
          <div className='flex justify-center mb-6'>
            <div className='flex flex-col gap-2'>
              <div>
                <label onMouseEnter={() => setIsHoveredAvatar(true)} onMouseLeave={() => setIsHoveredAvatar(false)} htmlFor='uploadAvatar' className='cursor-pointer'>
                  <div className='w-32 h-32 relative'>
                    <img src={previewAvatar || null} alt='avatar' className='rounded-[50%] w-full h-full object-cover border'/>
                    {isHoveredAvatar && <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center bg-[rgba(0,0,0,0.5)] items-center rounded-[50%]'>
                      <IoCreateSharp color='white' size={23}/>
                    </div>}
                  </div>
                </label>
                <input id='uploadAvatar' {...register('avatar')} type='file' hidden/>
              </div>
              <span className='font-medium'>{`${currentUser?.firstname} ${currentUser?.lastname}`}</span>
            </div>
          </div>
          <div className='flex items-center gap-3 w-full'>
            <div className='flex-1'>
              <label htmlFor='firstname'>First name</label>
              <input type='text' id='firstname' {...register('firstname')} className='p-2 w-full border-2 rounded-md'/>
            </div>
            <div className='flex-1'>
              <label htmlFor='lastname'>Last name</label>
              <input type='text' id='lastname' {...register('lastname')} className='p-2 w-full border-2 rounded-md'/>
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' {...register('email', { required : 'Please enter your email', pattern : {value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message : 'Invalid email address!'}})} className='p-2 w-full border-2 rounded-md'/>
            <small className='text-red-500'>{errors?.email?.message}</small>
          </div>
          <div>
            <label htmlFor='Phone'>Phone</label>
            <input type='number' id='mobile' {...register('mobile', { required: 'Please enter your mobile', pattern : { value : /^0[3|5|7|8|9]\d{8}$/, message : 'Invalid phone number!'}})} className='p-2 w-full border-2 rounded-md'/>
            <small className='text-red-500'>{errors?.mobile?.message}</small>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='flex-1'>
              <label htmlFor='status'>Operating status</label>
              <input type='text' id='status' {...register('status')} disabled className='p-2 w-full border-2 rounded-md'/>
            </div>
            <div className='flex-1'>
              <label htmlFor='role'>Role</label>
              <input type='text' id='role' {...register('role')} disabled className='p-2 w-full border-2 rounded-md'/>
            </div>
            <div className='flex-1'>
              <label htmlFor='createdAt'>CreatedAt</label>
              <input type='text' id='createdAt' {...register('createdAt')} disabled className='p-2 w-full border-2 rounded-md'/>
            </div>
          </div>
          <div className='flex justify-center mt-6'>
            {isDirty && (!isLoading ? <button type='submit' className='p-2 bg-main rounded-md text-white w-1/3 hover:bg-[#474747]'>Save Profile</button> : <button type='submit' className='p-2 bg-main rounded-md text-white w-1/3 hover:bg-[#474747] cursor-not-allowed' disabled>Loading...</button>)}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Personal