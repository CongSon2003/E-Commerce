import withBase from 'HOCS/withBase'
import React from 'react'

const MyCart = (props) => {
  console.log(props); // textHoc : {'...'}, dispatch , location , navigate
  return (
    <div className='text-black'>MyCart</div>
  )
}

// Gọi hoc withBase với component là cart
export default withBase(MyCart)
// export default MyCart