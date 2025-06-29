import React, { memo, useEffect, useState } from 'react'
import { CardProduct } from '../products'
import { apigetProducts } from '../../apis'
const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const result = await apigetProducts({totalRatings : {gte : 0}, limit : 9})
    if (result?.success) setProducts(result.response);
  }
  useEffect(() => {
    fetchProducts()
  }, []);
  return (
    <div className='flex flex-col w-full gap-5'>
      <header className='border-b-2 border-solid border-[#ee3131] text-[20px]'>
        <h2 className='uppercase py-[15px] font-semibold'>Featured Products</h2>
      </header>
      <div className='flex flex-wrap mx-[-10px]'>
        {
          products?.map(product => (<CardProduct key={product?._id} data={product}/>))
        }
      </div>
    </div>
  )
}

export default memo(FeatureProducts)