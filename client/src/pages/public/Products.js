import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb } from '../../component/common';
import { ItemProduct } from '../../component/products'
import { Filterby } from '../../component/search'
import { apigetProducts} from '../../apis';
import Masonry from 'react-masonry-css'
import ReactPaginate from 'react-paginate';
const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [numberSearches, setNumberSearches] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  useEffect(() => {
    const queryArray = [];
    let queryPrice = {};
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    console.log(searchParams);
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    if (queries.from && queries.to) {
      console.log("OK");
      queryPrice =  { $and : [{price : {gte : queries.from}}, {price : {lte : queries.to}}]}
      delete queries.price
    } else {
      if (Number(queries.from)) {
        queries.price = { gte : queries.from }
      }
      if (Number(queries.to)) {
        queries.price = { lte : queries.to }
      }
    }
    
    if (queries.page) {
      setCurrentPage(+queries.page - 1)
    }
    const navigation_url = {...queries};
    delete navigation_url.price
    console.log("OK");
    console.log(navigation_url);
    if (Object.keys(navigation_url).length > 0) {
      navigation({
        pathname : `/products/${category}`,
        search : createSearchParams(navigation_url).toString()
      })
    }
    delete queries.from;
    delete queries.to;
    queries.category = category
    const fetchGetProducts = async (queries) => {
      const result = await apigetProducts(queries);
      if (result?.success) {
        setProducts(result?.response)
        setNumberSearches(result?.NumberSearches)
      }
    }
    fetchGetProducts({...queries, ...queryPrice});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[category, searchParams])
  const changeValue = (e) => {
    navigation({
      pathname : `/products/${category}`,
      search : createSearchParams({
        sort : e.target.value
      }).toString()
    })
  }
  const [itemOffset, setItemOffset] = useState(0); // item start of page
  const itemsPerPage = process.env.REACT_APP_PRODUCTS_LIMIT || 10
  const endOffset = itemOffset + itemsPerPage; // item end of page
  const currentItems = products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(numberSearches / itemsPerPage);
  const handlePageClick = (event) => {
    console.log(event);
    const page = event.selected + 1 || 1;
    const queryArray = [];
    for (let i of searchParams.entries()) {
      queryArray.push(i);
    }
    const queries = {};
    for(let x of queryArray) {
      queries[x[0]] = x[1] 
    }
    console.log(queries);
    queries.page = page;
    setCurrentPage(+queries.page);
    navigation({
      pathname : `/products/${category}`,
      search : createSearchParams(queries).toString()
    })
    console.log(products);
    const newOffset = products && (event.selected * itemsPerPage) % products.length;
    window.scrollTo(0,0)
    setItemOffset(newOffset);
  };
  // const handleClearAll = () => {
  //   // navigation({
  //   //   pathname : `/products/${category}`,
  //   //   search : createSearchParams({}).toString()
  //   // })
  //   // setCurrentPage(0);
  //   // setItemOffset(0);
  // }
  return (
    <div className='w-full flex flex-col gap-5'>
      <Breadcrumb title={category} category={category}/> 
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-main flex flex-col gap-4'>
          <div className='border p-3 flex flex-col gap-2'>
            <div className='flex items-center justify-center'>
              <div className='w-4/5 flex-auto gap-2 flex flex-c'>
                <Filterby title={'Filter by'}/>
              </div>
              <div className='w-1/5 flex-auto'>
                <div className='flex flex-col justify-center gap-2 text-[#505050] px-4'>
                  <label htmlFor='SortBy' className='text-base font-semibold'>Sort by</label>
                  <select id='SortBy' name = "SortBy" onChange={(e) => changeValue(e)} className='p-3 outline-none border-gray-600 border cursor-pointer'>
                    <option value={''}>Featured</option>
                    <option value={'-sold'}>Best selling</option>
                    <option value={'title'}>Alphabetically, A-Z</option>
                    <option value={'-title'}>Alphabetically, Z-A</option>
                    <option value={'price'}>Price, low to high</option>
                    <option value={'-price'}>Price, high to low</option>
                    <option value={'createdAt'}>Date, old to new</option>
                    <option value={'-createdAt'}>Date, new to old</option>
                  </select>
                </div>
              </div>
            </div>
            {/* {searchParams.size > 0 && <div className='flex justify-start'>
              <button type='button' onClick={() => handleClearAll()} className='p-[5px] border text-sm'>Clear all</button>
            </div>} */}
          </div>
          <div className=''>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {currentItems?.map(element => (
                <ItemProduct isNew={false} key={element?._id} itemProductData={element} normal={true}/>
              ))}
            </Masonry>
          </div>
        </div>
        <div className='w-full flex justify-center mt-10 mb-2'>
          <div className='w-main flex justify-center'>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              className='flex items-center gap-3'
              pageClassName = ""
              pageLinkClassName = "w-full h-full py-[8px] px-[14px] border rounded hover:bg-gray-200 hover:text-black"
              breakClassName=''
              nextClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
              previousClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
              activeClassName = ""
              activeLinkClassName = "border-none bg-main text-white rounded hover:bg-main hover:text-white"
              pageCount={pageCount}
              forcePage={currentPage}
              previousLabel = "< previous"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products