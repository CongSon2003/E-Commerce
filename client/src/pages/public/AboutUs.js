import { Breadcrumb } from "component";
import React from "react";
import { BsDot } from "react-icons/bs";
const AboutUs = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Breadcrumb title={"About Us"} pages={"About Us"} />
      <div className="w-full bg-white flex justify-center font-[Poppins] pb-[20px]">
        <div className="w-main flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <div className="col-span-1 text-sm text-[#505050]">
              <p className="mb-[10px]">A great About Us page helps builds trust between you and your customers. The more content you provide about you and your business, the more confident people will be when purchasing from your store.</p>
              <p className="mb-[10px]">Your About Us page might include:</p>
              <ul className="mb-[10px]">
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Who you are</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Why you sell the items you sell</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Where you are located</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>How long you have been in business</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>How long you have been running your online shop</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Who are the people on your team</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Contact information</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsDot size={23}/>
                  <p>Social links (Twitter, Facebook)</p>
                </li>
              </ul>
              <p>To edit the content on this page, go to the Pages section of your Shopify admin.</p>
            </div>
            <div className="col-span-1">
              <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/digital_marketingSM_large.jpg?v=1487217022" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
