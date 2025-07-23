import { fomantMoney } from 'ultils/helper';
import { apigetProducts, apiDeleteProduct } from '../../apis'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import path from 'ultils/path';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { LuSquareMenu } from "react-icons/lu";
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const ManagerProducts = () => {
  const [products, setProducts] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [numberSearches,setNumberSearches] = useState(0);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const navigation = useNavigate();
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(numberSearches / itemsPerPage);
  const { handleSubmit, register, resetField } = useForm();
  useEffect(() => {
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {}; // ?page=2&title=abc => [['page', '2'], ['title', 'abc']] => { page : 2 }
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    if (queries.page) { 
      setCurrentPage(+queries.page - 1)
    }
    const fetchApiGetAllProducts = async (queries) => {
      try {
        const result = await apigetProducts(queries);
        if (result.success) {
          setProducts(result.response);
          setNumberSearches(result.NumberSearches);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchApiGetAllProducts(queries);
  },[searchParams, isDelete])
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const page = event.selected + 1 || 1
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    queries.page = page;
    setCurrentPage(+page)
    navigation({
      pathname : `/admin/${path.MANAGER_PRODUCTS_URL}`,
      search : createSearchParams(queries).toString()
    })
    setItemOffset(newOffset);
  };
  const handleOnSubmit_Search = (data) => {
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    if (data.title !== '' || data.title) {
      queries.title = data.title;
    }
    navigation({
      pathname : `/admin/${path.MANAGER_PRODUCTS_URL}`,
      search : createSearchParams(queries).toString()
    })
  }
  const handleEditProduct = (product) => {
    navigation(`/admin/update-product/${product._id}`)
  }
  const handleProductVarriations = (product) => {
    navigation(`/admin/manager-products/product-varriations/${product._id}`)
  }
  const handleDeleteProduct = (product) => {
    Swal.fire({
      title : 'Are you sure?',
      icon : 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDelete(prev => !prev);
        const result = await apiDeleteProduct(product._id);
        if (result.success) { 
          toast.success("Delete product successfully")
        } else {
          toast.error("Delete product failed")
        }
      }
    })
    
  }
  return (
    <div className='p-4 relative w-full h-full flex flex-col'>
      <header className='w-full border-b p-2 mb-6'>
        <h1 className='text-2xl font-medium uppercase'> Manager products</h1>
      </header>
      <div className='w-full flex flex-col '>
        <form onSubmit={handleSubmit(handleOnSubmit_Search)} className='flex justify-end items-center gap-4 mb-4'>
          <label htmlFor='searchtitle'></label>
          <input placeholder='Search products by title' {...register('title', {required : true})} id='searchtitle' className='p-2 w-1/3 border-2 border-solid'/>
          <button type='submit' className='bg-green-400 p-2 rounded text-white'>Search</button>
          <Link to={ `/admin/${path.MANAGER_PRODUCTS_URL}`} onClick={() => resetField('title')} className='bg-main p-2 rounded text-white' >Clear search All</Link>
        </form>
        <table className="table-auto w-full text-left scroll-m-0">
          <thead className='bg-gray-700 text-white border border-gray-500'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2 text-center'>Title and Slug</th>
              <th className='px-4 py-2 text-center'>Thumbnail</th>
              <th className='px-4 py-2 text-center'>Brand</th>
              <th className='px-4 py-2 text-center'>Price</th>
              <th className='px-4 py-2 text-center'>Category</th>
              <th className='px-4 py-2 text-center'>Quantity</th>
              <th className='px-4 py-2 text-center'>Sold</th>
              <th className='px-4 py-2 text-center'>Ratings</th>
              <th className='px-4 py-2 text-center'>Varriants</th>
              <th className='px-4 py-2 text-center'>CreatedAt</th>
              <th className='px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((product, index) => (
              <tr key={product._id} className='border border-gray-300'>
                <td className='px-4 py-2'>{index + currentPage * (process.env.REACT_APP_PRODUCTS_LIMIT || 10) + 1}</td>
                <td className='px-4 py-2 flex flex-col gap-2 justify-center'>
                  <span className='font-medium line-clamp-2'>{product.title}</span>
                  <span className='text-gray-500 line-clamp-1'>{product.slug}</span>
                </td>
                <td className='px-4 py-2 text-center'>
                  <img src={product?.thumb} alt={product.title} className='w-14 h-14 object-contain ml-3' />
                </td>
                <td className='px-4 py-2 text-center'>{product.brand}</td>
                <td className='px-4 py-2 text-center'>{`${fomantMoney(product.price)} VND`}</td>
                <td className='px-4 py-2 text-center'>{product.category}</td>
                <td className='px-4 py-2 text-center'>{product.quantity}</td>
                <td className='px-4 py-2 text-center'>{product.sold}</td>
                <td className='px-4 py-2 text-center'>{product.aggregateRating}</td>
                <td className='px-4 py-2 text-center'>{product.varriants.length || 0}</td>
                <td className='px-4 py-2 text-center'>{moment(product.createdAt).format('DD/MM/YYYY')}</td>
                <td className='px-4 py-2 text-center'>
                  <span onClick={() => handleEditProduct(product)} className='cursor-pointer hover:text-red-500 hover:underline text-center inline-block'><FaEdit size={23}/></span>
                  <span onClick={() => handleDeleteProduct(product)} className='cursor-pointer hover:text-red-500 hover:underline text-center inline-block ml-1'><MdDeleteForever size={23}/></span>
                  <span onClick={() => handleProductVarriations(product)}className='inline-block cursor-pointer hover:text-red-500 hover:underline text-center'><LuSquareMenu size={23}/></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products && <div className='w-full flex justify-center items-center mt-5'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          className='flex items-center gap-3'
          pageClassName = ""
          pageLinkClassName = "w-full h-full py-[8px] px-[14px] border rounded hover:bg-gray-200 hover:text-black"
          breakClassName=''
          nextClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
          previousClassName='bg-gray-200 py-[6px] px-[12px] rounded'
          activeClassName = ""
          activeLinkClassName = "bg-main text-white rounded hover:bg-main hover:text-white border-none"
          previousLabel="< previous"
          forcePage={currentPage || 0}
          renderOnZeroPageCount={null}
        />
      </div>}
    </div>
  )
}

export default ManagerProducts