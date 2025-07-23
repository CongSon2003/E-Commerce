import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/app/appSlice'
const Modal = ({children}) => {
  const dispatch = useDispatch();
  const { isShowModel } = useSelector(state => state.appReducer);
  console.log(isShowModel);
  // ${isShowModel === 2 ? 'animate__fadeIn animate__animated' : isShowModel === 3 ? 'animate-fade-out' : 'invisible'}
  return (
    <div onClick={(e) => {e.preventDefault(); dispatch(showModal({isShowModel : 3, dataModel : null}))}} className={`${isShowModel === 2 ? 'animate__fadeIn animate__animated' : isShowModel === 3 ? 'animate-fade-out' : 'invisible'} fixed left-0 h-screen flex justify-center items-center right-0 bg-[rgba(0,0,0,0.5)] z-30`}>
      {children}
    </div>
  )
}

export default memo(Modal)