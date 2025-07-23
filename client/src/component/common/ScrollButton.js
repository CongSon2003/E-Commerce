// components/ScrollButton.js

import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button onClick={scrollToTop} className={`${visible === false && 'hidden'} fixed bottom-[10px] right-[10px] w-[40px] h-[40px] flex justify-center items-center bg-[#a0a0a0] hover:bg-main rounded-md z-[1] cursor-pointer text-green-500 transform -translate-x-1/`}>
      <FaCaretUp
        color="white"
        size={25}
      />
    </button>
  );
};

export default ScrollButton;
