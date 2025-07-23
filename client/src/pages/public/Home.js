import React from "react";
import {
  GalleryAdvanced,
} from "../../component/public";
import { Bestseller } from '../../component/products'
import { Banner, BlogsPost, BrandsSlider } from '../../component/common'
import { DailyDeals, NewArrivals, HotCollections, FeatureProducts } from '../../component/public'
import { Sidebar } from '../../component/sideBar'
const Home = () => {
  return (
    <div className="flex flex-col gap-5 justify-center w-full items-center">
      <div className="flex flex-col justify-center w-main gap-5">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 w-[28%]">
            <Sidebar />
            <DailyDeals />
          </div>
          <div className="flex flex-col gap-5 w-[72%]">
            <Banner />
            <Bestseller />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <FeatureProducts />
          <GalleryAdvanced />
          <NewArrivals />
          <HotCollections />
          <BlogsPost />
          <BrandsSlider/>
        </div>
      </div>
    </div>
  );
};

export default Home;
