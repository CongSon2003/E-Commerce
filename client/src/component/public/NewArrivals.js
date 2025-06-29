import React, { memo } from 'react'
import Slider from 'react-slick';
import { ItemProduct } from '../products';
import { useSelector } from 'react-redux';
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const NewArrivals = () => {
  const { NewProducts } = useSelector(state => state.productsReducer);
  return (
    <div className='flex flex-col w-full gap-5'>
      <header className='border-b-2 border-solid border-[#ee3131] text-[20px]'>
        <h2 className='uppercase py-[15px] font-semibold'>New Arrivals</h2>
      </header>
      <div className='flex flex-col mx-[-10px]'>
        <Slider {...settings}>
          { NewProducts?.map(product => {
            return (
              <ItemProduct isNew={false} key={product._id} itemProductData={product}/>
            )
          })}
        </Slider>
        
      </div>
    </div>
  )
}

export default memo(NewArrivals)