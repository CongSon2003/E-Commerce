import React, { memo, useEffect, useState } from 'react';
import { ItemHotCollection } from './'
import { useSelector } from 'react-redux'
const HotCollections = () => {
  const [categories, setCategories] = useState([]);
  const app = useSelector((state) => state.appReducer);
  const shouldFilterOut = (item) => {
    const nameToExclude = ['Speaker', 'Camera'];
    return nameToExclude.includes(item)
  }
  useEffect(() => {
    if (app.categories) {
      const getCategories = app.categories.filter(item => !shouldFilterOut(item.title));
      setCategories(getCategories)
    };
  }, [app.categories])
  return (
    <div className='flex flex-col w-full gap-5'>
      <header className='border-b-2 border-solid border-[#ee3131] text-[20px]'>
        <h2 className='uppercase pb-[15px] font-semibold'>Hot Collections</h2>
      </header>
      <div className='flex flex-wrap mx-[-10px]'>
        { categories?.map(((child, index) => {
          return (
            <ItemHotCollection index={index} key={index} data={child}/>
          )
        }))}
      </div>
    </div>
  )
}

export default memo(HotCollections)