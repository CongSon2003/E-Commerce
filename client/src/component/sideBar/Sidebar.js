import React, { useState, useEffect, memo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import handleDataCategory from "../../ultils/DataCategory";
const Sidebar = () => {
  const [productCategories, setProductCategories] = useState(null);
  const app = useSelector((state) => state.appReducer);
  useEffect(() => {
    if (app.categories) {
      const DataCategory = handleDataCategory(app.categories);
      setProductCategories(DataCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);
  return (
    <div className="w-full flex flex-col gap-5 border">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-3 py-[10px] px-[20px] font-semibold bg-main text-white">
          <span>
            <GiHamburgerMenu className="text-xl" />
          </span>
          <span>ALL COLLECTIONS</span>
        </div>
        <div>
          <ul className="flex flex-col">
            {productCategories &&
              productCategories.map((category) => (
                <li key={category.id} className="px-[20px] pt-[15px] pb-[14px]">
                  <NavLink
                    key={category._id}
                    to={`/products/${category?.title}`.toLowerCase()}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-[20px] h-[20px] object-cover"
                        />
                      </div>
                      <div className="hover:text-main">{`${category.title} (8)`}</div>
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
