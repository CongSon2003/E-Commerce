import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { showModal } from '../store/app/appSlice'
const Modal = ({children}) => {
  const dispatch = useDispatch()
  return (
    <div onClick={(e) => {e.preventDefault(); dispatch(showModal({isShowModel : false, dataModel : null}))}} className='absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.5)] z-30'>
      {children}
    </div>
  )
}

export default memo(Modal)