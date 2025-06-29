import React, { useMemo } from 'react'

const usePagination = ({totalProductCount, currentPage, siblingCount = 1}) => {
  const pagination = useMemo(() => {
    const limit = process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const page = Math.ceil(totalProductCount / limit) || 1;
  }, [totalProductCount])
  return pagination;
}

export default usePagination