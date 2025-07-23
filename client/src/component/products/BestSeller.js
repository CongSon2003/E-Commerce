import React, { memo, useEffect, useState } from "react";
import { apigetProducts } from "../../apis";
import { ItemProduct } from "./";
import Slider from "react-slick";
import 'animate.css';
const Navtabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new Arrivals" },
  { id: 3, name: "Tablet" },
];
var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const Bestsellers = () => {
  const [bestSellers, setBestsellers] = useState([]);
  const [newArrials, setNewArrials] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [isHoverBarBoxLeft, setIsHoverBarBoxLeft] = useState(1);
  const [isHoverBarBoxRight, setIsHoverBarBoxRight] = useState(1);
  const fetchProducts = async () => {
    const [bestSellers, newArrials] = await Promise.all([
      apigetProducts({ sort: "-sold" }),
      apigetProducts({ sort: "-createdAt" }),
    ]);
    if (bestSellers?.success) {
      setBestsellers(bestSellers);
    }
    if (newArrials?.success) {
      setNewArrials(newArrials);
    }
    setProducts(bestSellers);
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    }
    if (activeTab === 2) {
      setProducts(newArrials);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="pb-[15px] border-b-2 border-solid border-[#ee3131] text-[20px] flex">
        {Navtabs.map((tab) => {
          return (
            <div key={tab.id} className={`font-semibold uppercase font-[Poppins]`}>
              <span
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer ${
                  tab.id !== 1
                    ? "px-[20px] border-l-2 border-solid border-[#ebebeb]"
                    : "pr-[20px]"
                } ${activeTab === tab.id ? "opacity-100" : "opacity-45"}`}
              >
                {tab.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col mx-[-10px]">
        <Slider {...settings}>
          {products?.response?.map((item) => {
            return (
              <ItemProduct
                key={item._id}
                itemProductData={item}
                isNew={activeTab === 1 ? true : false}
              />
            );
          })}
        </Slider>
      </div>
      <div className="flex justify-between gap-5">
        <div onMouseMove={() => setIsHoverBarBoxLeft(2)} onMouseLeave={() => setIsHoverBarBoxLeft(3)} className="flex-1 w-full h-[140px] relative barbox">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
          {<div className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${isHoverBarBoxLeft === 2 ? 'animate_zoomInTopLeft' : isHoverBarBoxLeft === 3 ? 'animate_zoomOutLeft' : 'invisible'}`}></div>}
          {<div className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${isHoverBarBoxLeft === 2 ? 'animate_zoomInBottomRight' : isHoverBarBoxLeft === 3 ? 'animate_zoomOutRight' : 'invisible'}`}></div>}
        </div>
        <div onMouseMove={() => setIsHoverBarBoxRight(2)} onMouseLeave={() => setIsHoverBarBoxRight(3)} className="flex-1 w-full h-[140px] relative">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
            alt=""
          />
          {<div className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${isHoverBarBoxRight === 2 ? 'animate_zoomInTopLeft' : isHoverBarBoxRight === 3 ? 'animate_zoomOutLeft' : 'invisible'}`}></div>}
          {<div className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${isHoverBarBoxRight === 2 ? 'animate_zoomInBottomRight' : isHoverBarBoxRight === 3 ? 'animate_zoomOutRight' : 'invisible'}`}></div>}
        </div>
      </div>
    </div>
  );
};

export default memo(Bestsellers);
