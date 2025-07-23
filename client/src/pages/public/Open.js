import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../component/public";
import { ScrollButton, SuggestProduct } from "component/common";
const Open = () => {
  const [isShowSuggestProduct, setIsShowSuggestProduct] = useState(1);
  const handleShowSuggestProduct = (value) => {
    setIsShowSuggestProduct(value);
  };
  console.log(isShowSuggestProduct);
  useEffect(() => {
    if (isShowSuggestProduct === 1) {
      setTimeout(() => {
        setIsShowSuggestProduct(2);
      }, 3000)
    }
    const intervalId = setInterval(() => {
      setIsShowSuggestProduct(prev => prev + 1); // Using functional update
    }, 10000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [isShowSuggestProduct]);
  console.log(isShowSuggestProduct);
  return (
    <div className="flex flex-col gap-5">
      <ScrollButton />
      {isShowSuggestProduct !== 1 && (
        <SuggestProduct
          handleShowSuggestProduct={handleShowSuggestProduct}
          isShowSuggestProduct={isShowSuggestProduct}
        />
      )}
      <Header />
      <div className="w-full flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
//absolute bg-[#4c4c4c] top-0 left-0 right-0 bottom-0 z-30
export default Open;
