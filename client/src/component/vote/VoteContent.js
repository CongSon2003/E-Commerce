import React, { memo, useRef, useEffect, useState } from 'react'
import logo from '../../assets/logo_digital_new_250x.png'
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { voteOptions } from '../../ultils/contant'
const VoteContent = ({nameProduct, handleSubmitVote}) => {
  const modalRef = useRef();
  const [seleteStar, setSelecteStar] = useState(null);
  const [comment, setComment] = useState('');
  useEffect(() => { 
    modalRef.current.scrollIntoView({block : 'center'})
  },[])
  return (
    <div ref={modalRef} onClick={(e) => {e.stopPropagation()}} className='bg-white border-[1px] rounded-md border-solid border-black w-2/5 p-4 gap-4 flex flex-col items-center justify-center'>
      <img src={logo} alt='' className='object-contain'/>
      <h2>{nameProduct}</h2>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} id='voteText' name='voteText' className='border w-full p-4' placeholder='Please share some thoughts about the product.'></textarea>
      <div className='flex flex-col gap-4 w-full border rounded p-3'>
        <p>How do you like this product ?</p>
        <div className='flex items-center justify-center gap-4'>
          {voteOptions.reverse().map(el => (
            <div onClick={() => setSelecteStar(el.id)} key={el.id} className='flex flex-col items-center justify-center border p-3 w-[100px] cursor-pointer bg-gray-200 hover:bg-gray-400 rounded'>
              {(seleteStar >= el.id && Number(seleteStar)) ? <IoMdStar color='orange'/> : <IoIosStarOutline/>}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <button className='p-2 hover:bg-[#474747] bg-main rounded text-white w-1/2' onClick={() => handleSubmitVote({comment, score : seleteStar})}>Submit a review</button>
    </div>
  )
}

export default memo(VoteContent)