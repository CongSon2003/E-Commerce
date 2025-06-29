import React, { memo, useState } from 'react';
import ReactPaginate from 'react-paginate';
const items = [...Array(20).keys()];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
const Pagination = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log(pageCount);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  console.log('enOffset : ', endOffset);
  console.log();
  console.log("current item" , currentItems);
  return (
    <div className='flex flex-col'>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        className='flex items-center gap-3'
        pageClassName = ""
        pageLinkClassName = "w-full h-full py-[8px] px-[14px] border rounded hover:bg-gray-200 hover:text-black"
        breakClassName=''
        nextClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
        previousClassName='border bg-gray-200 py-[6px] px-[12px] rounded'
        activeClassName = ""
        activeLinkClassName = "bg-main text-white rounded"
        pageCount={pageCount}
        previousLabel = "< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

  export default memo(Pagination)

/* 
  +, first + last + current + sibling (liền trước và liền sau pageCurrent) + 2 * dots(...)
  +, min = 6 ;
  // totalPaginaging : 66 , limit : 10 => 1-10 : page 1; 11 - 21: page 2; 12 - 22 : page3 ... 
  // page = 66 / 10 : 6,6 = 7 , 6,2 => 0.2 * 10 = 2 
  // totalPaginating 

  [1,2,3,..,6]
*/