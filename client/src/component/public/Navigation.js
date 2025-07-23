import React, { memo, useState } from "react";
import { navigation } from "../../ultils/contant";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
const Navigation = () => {
  const [isHover, setIsHover] = useState(false);
  // const 
  const handleHover = (id, on) => {
    if (on === 'Move' && id === 3) {
      setIsHover(true);
    }
    if (on === 'Leave' && id === 3) {
      setIsHover(false);
    }
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center justify-between w-main py-2 border-y">
        <div className="flex items-center gap-4 w-[80%]">
          {navigation.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={"relative pr-[30px] flex items-center gap-1 hover:text-main"}
              >
                <div onMouseMove={() => handleHover(item.id, 'Move')} onMouseLeave={() => handleHover(item.id, 'Leave')} className="flex items-center gap-1 py-1">
                  <span>{item.value}</span>
                  {item.id !== 1 && <FaCaretDown/>}
                </div>
                {(item.id === 3 && isHover) && <div onMouseMove={() => handleHover(item.id, 'Move')} onMouseLeave={() => handleHover(item.id, 'Leave')} className="absolute bg-white z-50 shadow-2xl border hover:text-black text-black left-0 right-0 top-[29px] min-w-[220px] py-[30px] px-[10px]">
                  <ul className="flex flex-col gap-[10px] font-normal text-base">
                    {item.type === 'parent' && item.submenu.map(el => (
                      <li className="px-5">
                        <Link to={el.path} onClick={() => setIsHover(false)} className="hover:text-main">{el.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>}
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
