import React, { memo, useCallback, useState } from "react";
import { ItemFilter } from "./";
const Filterby = ({ title, name }) => {
  const [active, setActive] = useState(null);
  const handleChangeActiveFilter = useCallback(
    (name) => {
      if (active === name) {
        setActive(null);
      } else {
        setActive(name);
      }
    },
    [active]
  );
  return (
    <div className="flex flex-col w-full justify-center items-start relative text-[#505050] gap-2">
      <p className="text-base font-semibold">{title}</p>
      <div className="flex gap-2 items-center">
        <ItemFilter
          name={"Price"}
          active={active}
          setActive={handleChangeActiveFilter}
          type="input"
        />
        <ItemFilter
          name={"Color"}
          active={active}
          setActive={handleChangeActiveFilter}
        />
        
      </div>
    </div>
  );
};

export default memo(Filterby);
