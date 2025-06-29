import React, { memo, useEffect, useState } from "react";
import { apigetBrands } from "../../apis";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  autoplaySpeed: 2000,
};
const BrandsSlider = () => {
  const [brands, setBrands] = useState([]);
  const fetchApiBrands = async () => {
    const result = await apigetBrands();
    if (result?.success) {
      setBrands(result.response);
    }
  };
  useEffect(() => {
    fetchApiBrands();
  }, []);
  return (
    <div className="flex flex-col mb-[10px]">
      <Slider {...settings} className="Brands_Slider">
        {brands?.map((brand, index) => {
          return (
            <div key={index} className="flex w-full h-full">
              <img src={brand?.logo} alt="" className="object-contain" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default memo(BrandsSlider);
