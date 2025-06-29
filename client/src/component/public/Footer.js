import React, { memo } from "react";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { IoLogoPinterest } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcDinersClub } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-main flex flex-col items-center py-[25px]">
        <div className="w-main flex items-center justify-between">
          <div className="text-white flex flex-col flex-1">
            <div className="font-normal text-xl uppercase">
              Sign up to Newsletter
            </div>
            <div className="opacity-60 tex">
              Subscribe now and receive weekly newsletter
            </div>
          </div>
          <div className="flex-1 flex items-center text-white">
            <input id="input_email" className="h-[50px] px-5 w-full rounded-l-full placeholder:text-gray-300 outline-none bg-[#ffffff1a]" type="text" placeholder="Email address"/>
            <div className="bg-[#ffffff1a] h-[50px] pr-5 flex items-center rounded-r-full"><MdEmail size={18}/></div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#191919] flex flex-col text-white items-center justify-center py-[50px]">
        <div className="w-main flex">
          <div className="flex-2 gap-5 flex flex-col">
            <div className="uppercase font-semibold pl-[15px] border-l-[3px] border-[red]">
              About us
            </div>
            <div>
              <ul className="mb-5 flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-1">
                  <strong className="flex items-center gap-2">
                    <FaMapMarkerAlt/>
                    Address:
                  </strong>
                  <span className="opacity-70 text-sm">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                </li>
                <li className="flex items-center gap-1">
                  <strong className="flex items-center gap-2">
                    <FaPhoneAlt/>
                    Phone:
                  </strong>
                  <span className="opacity-70 text-sm">(+1234)56789xxx</span>
                </li>
                <li className="flex items-center gap-1">
                  <strong className="flex items-center gap-2">
                    <MdEmail/>
                    Mail:
                  </strong>
                  <span className="opacity-70 text-sm">tadathemes@gmail.com</span>
                </li>
              </ul>
              <div className="flex gap-2">
                <div className="bg-[#303030] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded">< FaFacebookF size={16}/></div>
                <div className="bg-[#303030] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded">< FaTwitter size={16}/></div>
                <div className="bg-[#303030] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded">< IoLogoPinterest size={17}/></div>
                <div className="bg-[#303030] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded">< BsGoogle size={16}/></div>
                <div className="bg-[#303030] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded">< GrInstagram size={16} /></div>
              </div>
            </div>
          </div>
          <div className="flex-1 gap-5 flex flex-col">
            <div className="uppercase font-semibold pl-[15px] border-l-[3px] border-[red]">
              Information
            </div>
            <div>
              <ul className="mb-5 flex flex-col gap-2 text-sm">
                <li className="opacity-70 text-sm">
                  Typography
                </li>
                <li className="opacity-70 text-sm">
                  Gallery
                </li>
                <li className="opacity-70 text-sm">
                  Store Location
                </li>
                <li className="opacity-70 text-sm">
                  Today's Deals
                </li>
                <li className="opacity-70 text-sm">
                  Contact
                </li>
              </ul>
              <div></div>
            </div>
          </div>
          <div className="flex-1 gap-5 flex flex-col">
            <div className="uppercase font-semibold pl-[15px] border-l-[3px] border-[red]">
              Who we are
            </div>
            <div>
              <ul className="mb-5 flex flex-col gap-2 text-sm">
                <li className="text-sm">
                  <Link to={`/`} className="cursor-pointer opacity-70 hover:opacity-100">Help</Link>
                </li>
                <li className="text-sm">
                  <Link to={`/`} className="cursor-pointer opacity-70 hover:opacity-100">Free Shipping</Link>
                </li>
                <li className="text-sm">
                  <Link to={`/`} className="cursor-pointer opacity-70 hover:opacity-100">FAQs</Link>
                </li>
                <li className="text-sm">
                  <Link to={`/`} className="cursor-pointer opacity-70 hover:opacity-100">Return & Exchange</Link>
                </li>
                <li className="text-sm">
                  <Link to={`/`} className="cursor-pointer opacity-70 hover:opacity-100">Testimonials</Link>
                </li>
              </ul>
              <div></div>
            </div>
          </div>
          <div className="flex-1 gap-5 flex flex-col">
            <div className="uppercase font-semibold pl-[15px] border-l-[3px] border-[red]">
              #DigitalWorldStore
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-[#0f0f0f] text-white items-center py-3">
        <div className="w-main flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#b7b7b7]">
            <p>© 2025, Digital World 2</p>
            <p>Powered by Shopify</p>
          </div>
          <div>
            <ul className="flex gap-5 items-center">
              <li>
                <FaCcVisa size={40}/>
              </li>
              <li>
                <FaCcPaypal size={40}/>
              </li>
              <li>
                <FaCcDinersClub size={40}/>
              </li>
              <li>
                <FaCcDiscover size={40}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
