import { apiGetOrdersUser } from '../../apis';
import React, { useEffect, useState } from 'react'
import { FaHistory } from "react-icons/fa";
import moment from 'moment';
import { GoDot } from "react-icons/go";
import { VND } from 'ultils/helper';
const PurchaseHistory = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchApiGetOrdersUser = async () => {
      const result = await apiGetOrdersUser();
      console.log(result);
      if (result.success || result.response) {
        setOrders(result.response);
      }
    }
    fetchApiGetOrdersUser()
  }, []);
  console.log(orders);
  return (
    <div className='w-full p-5'>
      <header className="border-b border-black pb-4 mb-4 flex items-center gap-2">
        <h1 className="uppercase text-2xl font-medium">Purchase History</h1>
        <FaHistory size={20}/>
      </header>
      <div className='bg-white'>
        <div className="grid grid-cols-10 caption-top font-medium border py-[15px] px-[20px]">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-4 text-center">Products</span>
          <span className="col-span-1 text-center">Status</span>
          <span className="col-span-1 text-center">Method</span>
          <span className="col-span-1 text-center">Date</span>
          <span className="col-span-1 text-center">Amount</span>
          <span className="col-span-1 text-center">Action</span>
        </div>
        {orders?.map((item, index) => (
          <div
            key={item._id}
            className="py-[15px] px-[20px] border-x border-b items-center grid grid-cols-10"
          >
            <span className='col-span-1 text-center'>{index + 1}</span>
            <span className='col-span-4 text-center capitalize'>
              {
                item.products.map(el => (
                  <div className='flex items-center gap-1'>
                    <GoDot/>
                    <span>{el.product.title}</span>
                    <span>-</span>
                    <span>{el.color}</span>
                  </div>
                ))
              }
            </span>
            <span className='col-span-1 text-center capitalize'>{item.status}</span>
            <span className='col-span-1 text-center capitalize'>{item.paymentMethod}</span>
            <span className='col-span-1 text-center'>{moment(item.createdAt).format('DD/MM/YYYY')}</span>   
            <span className='col-span-1 text-center'>{VND.format(item.total)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchaseHistory