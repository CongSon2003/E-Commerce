import React, { memo } from "react";
import { navigation } from "../../ultils/contant";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center justify-between w-main py-[10px] border-y">
        <div className="flex items-center gap-4 w-[80%]">
          {navigation.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-main pr-[30px]" : "hover:text-main pr-[30px]"
                }
              >
                {item.value}
              </NavLink>
            );
          })}
          <NavLink className="hover:text-main">CONTACT US</NavLink>
        </div>
        <div className="w-[20%]">Search something</div>
      </div>
    </div>
  );
};

export default memo(Navigation);
