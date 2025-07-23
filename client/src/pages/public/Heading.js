import { Breadcrumb } from "component";
import React from "react";

const Heading = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Breadcrumb title={"Heading"} pages={"Heading"} />
      <div className="w-full bg-white flex justify-center pb-5">
        <div className="w-main flex flex-col gap-4">
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-5">
              <h2 className="pt-[17px] pb-[15px] px-5 border-t border-t-[red] border-b border-r border-l uppercase font-semibold text-main text-xl">Heading Title</h2>
              <p>In sagittis nisl erat, nec rutrum sapien euismod quis. Donec placerat ac libero a malesuada. Nunc sit amet malesuada orci, ut volutpat nibh. Quisque rutrum non metus quis ullamcorper. Phasellus quis eros euismod, pretium justo nec, vehicula orci. Morbi posuere fermentum purus, vitae ultricies lacus aliquam vitae. Phasellus nisl metus, eleifend ac mauris in, convallis euismod nulla. Aliquam at rhoncus nisi.</p>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="pt-[17px] pb-[15px] border-b-2 border-b-[red] uppercase font-semibold text-xl">Heading Title</h2>
              <p>In sagittis nisl erat, nec rutrum sapien euismod quis. Donec placerat ac libero a malesuada. Nunc sit amet malesuada orci, ut volutpat nibh. Quisque rutrum non metus quis ullamcorper. Phasellus quis eros euismod, pretium justo nec, vehicula orci. Morbi posuere fermentum purus, vitae ultricies lacus aliquam vitae. Phasellus nisl metus, eleifend ac mauris in, convallis euismod nulla. Aliquam at rhoncus nisi.</p>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-[#151515] flex justify-center">
                <span className="relative flex justify-center pb-2 text-[26px]"> 
                  Heading Title
                  <span className="absolute w-1/3 h-[2px] bottom-0 bg-[#ccc]"></span>
                </span>
              </h2>
              
              <p>In sagittis nisl erat, nec rutrum sapien euismod quis. Donec placerat ac libero a malesuada. Nunc sit amet malesuada orci, ut volutpat nibh. Quisque rutrum non metus quis ullamcorper. Phasellus quis eros euismod, pretium justo nec, vehicula orci. Morbi posuere fermentum purus, vitae ultricies lacus aliquam vitae. Phasellus nisl metus, eleifend ac mauris in, convallis euismod nulla. Aliquam at rhoncus nisi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
