import React, { memo, useEffect, useState } from 'react'
import { IoChevronDownOutline } from "react-icons/io5";
import { colors } from '../../ultils/contant'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apigetProducts } from '../../apis'
import { fomantMoney } from '../../ultils/helper';
const ItemFilter = ({name, active, setActive, type = 'checkbox'}) => {
  const [selected, setSeleted] = useState([]);
  const [highestPrice, setHighestPrice] = useState();
  const [searchParams] = useSearchParams();
  const [isResetPrice, setIsResetPrice] = useState(false);
  const [price, setPrice] = useState({
    from : '',
    to : ''
  })
  const navigation = useNavigate();
  const { category } = useParams();
  const handleSelected = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSeleted(prev => [...prev, value])
    } else {
      setSeleted(selected?.filter(el => el !== value))
    }
    
  }
  const handleResetPrice = () => {
    setIsResetPrice(prev => !prev);
    setPrice({
      from : '',
      to : ''
    })
  }
  const handleReset = () => {
    setSeleted([]);
    setPrice({
      from : '',
      to : ''
    })
    setActive(null)
  }
  const handleOnchangePrice = (e, type) => {
    if (e.target.value > highestPrice) {
      return 
    }
    if (type === 'from') {
      setPrice(prev => ({...prev, from : e.target.value}))
    } else { 
      setPrice(prev => ({...prev, to : e.target.value}))
    }
  }
  useEffect(() => {
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    if (selected?.length > 0){
      queries.color = selected.join(',')
    } else {
      delete queries.color
    }
    console.log(queries);
    if (active === name) {
      navigation({
        pathname : `/products/${category}`,
        search : createSearchParams(queries).toString()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selected])
  useEffect(() => {
    const fetchApihighestPrice = async () => {
      const result = await apigetProducts({sort : '-price', limit : 1})
      if (result.success) {

        setHighestPrice(result.response[0].price);
      }
    }
    if (type === 'input') {
      fetchApihighestPrice()
    }
  },[type])
  useEffect(() => {
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    if (+price.from > 0) {
      queries.from = price.from;
    } else {
      delete queries.from;
    }
    if (+price.to > 0) {
      queries.to = price.to;
    } else {
      delete queries.to;
    }
    if (queries.to || queries.from) { 
      navigation({
        pathname : `/products/${category}`,
        search : createSearchParams(queries).toString()
      })
    }
    console.log(queries);
    if (Object.keys(queries).length > 0) {
      navigation({
        pathname : `/products/${category}`,
        search : createSearchParams(queries).toString()
      })
    }
    if (isResetPrice) { 
      setIsResetPrice(prev => !prev);
      delete queries.from
      delete queries.to
      navigation({
        pathname : `/products/${category}`,
        search : createSearchParams(queries).toString()
      })
    }
  },[category, isResetPrice, navigation, price.from, price.to, searchParams])
  console.log(active);
  console.log(name);
  return (
    <div onClick={() => setActive(name)} className={`relative flex text-sm items-center p-3 ${active === name ? 'border-[red]' : 'border-gray-600'} border border-solid  hover:shadow-md cursor-pointer`}>
      <span className='mr-7 capitalize'>{name}</span>
      <IoChevronDownOutline />
      { active === name && <div onClick={(e) => e.stopPropagation()} className='absolute left-0 border border-solid z-20 w-[23rem] top-custom-top'>
        {type === 'checkbox' && 
          <div className='bg-white'>
            <div className='flex items-center justify-between border-b py-2 px-6'>
              <span>{`${selected.length} selected`}</span>
              <span onClick={() => handleReset()} className='underline text-[#1a1b18] cursor-pointer'>Reset</span>
            </div>
            <ul className='py-2 px-6 text-[#505050] text-xl gap-3 flex flex-col'>
              {colors?.map((color, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <label className="flex items-center cursor-pointer relative" htmlFor={color}>
                    <input type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-400 checked:bg-slate-800 checked:border-slate-800"
                      id={color}
                      value={color}
                      checked = {selected?.some(x => x === color)}
                      onChange={handleSelected}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </label>
                  <label className="cursor-pointer ml-2 text-slate-600 text-sm capitalize font-medium" htmlFor={color}>
                    {color}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        }
        {type === 'input' && <div className='bg-white text-[#505050] '>
            <div className='flex items-center justify-between border-b py-2 px-6'>
              <div className='flex flex-col'>
                <span>{`The highest price is ${fomantMoney(highestPrice)} VND `}</span>
                <span>Default input value is USD</span>
              </div>
              <span onClick={() => handleResetPrice()} className='underline text-[#1a1b18] cursor-pointer'>Reset</span>
            </div>
            <div className='p-[26px] flex items-center justify-center gap-3'>
              <div className='flex items-center gap-1'>
                <label htmlFor='from'>From</label>
                <input type='number' id='from' onChange={(e) =>  handleOnchangePrice(e,'from')} value={price.from} className='h-[40px] w-full bg-[#f6f6f6] border border-solid p-2'/>
              </div>
              <div className='flex items-center gap-1'>
                <label htmlFor='to'>To</label>
                <input type='number' onChange={(e) => handleOnchangePrice(e,'to')} value = { price.to } id = "to" className='h-[40px] w-full bg-[#f6f6f6] border border-solid p-2'/>
              </div>
            </div>
          </div>}
      </div>}
    </div>
  )
}

export default memo(ItemFilter)