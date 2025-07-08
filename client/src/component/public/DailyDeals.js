import React, { useEffect, useState, memo } from "react";
import { IoMdStar } from "react-icons/io";
import { apigetProducts } from "../../apis/";
import { fomantMoney, renderStarProduct } from "../../ultils/helper";
import { GiHamburgerMenu } from "react-icons/gi";
import { CountDown } from "./";
const DailyDeals = () => {
  const [dailyDealys, setDailyDealys] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [restoreTime, setRestoreTime] = useState(false);
  const fetchDealsDaily = async () => {
    const result = await apigetProducts({
      limit: 1,
      totalRatings: { gt: 4 },
      page: Math.round(Math.random() * 5),
    });
    
    if (result?.success) {
      setDailyDealys(result.response[0]);
      // setHours(24 - new Date().getHours());
      // setMinutes(60 - new Date().getMinutes());
      // setSeconds(60 - new Date().getSeconds());
      setHours(2);
      setMinutes(2);
      setSeconds(2);
    }
  };
  useEffect(() => {
    fetchDealsDaily();
  }, [restoreTime]);
  useEffect(() => {
    let intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(2);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(2);
            setSeconds(2);
          } else {
            setRestoreTime((prev) => !prev);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds, minutes, hours, restoreTime]);
  return (
    <div className="border w-full">
      <div className="p-5 content-center">
        <div className="flex items-center justify-center mb-[50px]">
          <IoMdStar color="red" fontSize={25} />
          <span className="uppercase opacity-75 text-[20px] text-center font-semibold flex-auto">
            Daily Deals
          </span>
        </div>
        <div className="flex flex-col text-center gap-2">
          <img src={dailyDealys?.thumb} className="object-cover cursor-pointer w-[255px] h-[255px]" alt="" />
          <div className="flex flex-col justify-center text-center gap-1">
            <div className="text-[#2b3743] flex justify-center line-clamp-1 mb-2">
              <a href="/products/example-book-3" className="line-clamp-1">
                {dailyDealys?.title || "null"}
              </a>
            </div>
            <div className="flex justify-center">
              <div className="flex">
                {renderStarProduct(dailyDealys?.totalRatings, 20)?.map(
                  (star) => star
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <span>{fomantMoney(dailyDealys?.price)} VND</span>
            </div>
          </div>
          <div>
            <div className="flex justify-around items-start mb-[15px]">
              <CountDown time={hours} unit={"Hours"} />
              <CountDown time={minutes} unit={"Minutes"} />
              <CountDown time={seconds} unit={"Seconds"} />
            </div>
            <button className=" w-full flex gap-2 items-center bg-main text-white py-2 px-3 cursor-pointer hover:bg-[#323333] justify-center">
              <GiHamburgerMenu />
              <span className="uppercase">options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DailyDeals);
