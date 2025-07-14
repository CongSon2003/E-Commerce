import React, { memo, useEffect, useState } from "react";
import { login, logout } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "./";
import { FaFacebook, FaRegUserCircle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { IoLogoPinterest } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import logo from "../../assets/logo_digital_new_250x.png";
import { MdEmail } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import Path from "ultils/path";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiAcccount_register,
} from "../../apis";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { CiHeart } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { getCurrentUser } from "../../store/user/asyncUserAction";
import path from "ultils/path";
import { showRightCart } from "store/app/appSlice";
const Header = () => {
  const [isLogin, setIslogin] = useState(true);
  const { isLoggedIn, currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isLoginOrRegister, setIsLoginOrRegister] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotpassword] = useState(false);
  const [emailResetPassword, setEmailResetPassword] = useState("");

  const [textErrorLogin, setTextErrorLogin] = useState("");
  const [isErrorLogin, setIsErrorLogin] = useState(false);

  const [textErrorRegister, setTextErrorRegister] = useState("");
  const [isErrorRegister, setIsErrorRegister] = useState(false);

  const [token, setToken] = useState("");
  const [isCheckToken, setIsCheckToken] = useState(false);
  const [textErrorToken, setTextErrorToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { wishListLocal } = useSelector((state) => state.appReducer);
  // const [textError, set]
  const handleLogin = async (data) => {
    setIsLoading(true);
    console.log(data);
    const result_login = await apiLogin(data);
    console.log(result_login);
    if (result_login?.success) {
      // Dispatch lưu vào localStorage:
      dispatch(
        login({ isLoggedIn: true, accessToken: result_login?.accessToken })
      );
      setIsLoginOrRegister(false);
      setIsCheckToken(false);
      setIsLoading(false);
      Swal.fire({
        title: result_login.success ? "Good job!" : "Oops...",
        text: result_login.success
          ? "Login successfully"
          : "Email or Password incorrect!",
        icon: result_login.success ? "success" : "error",
      });
    } else {
      setIsErrorLogin(true);
      setTextErrorLogin("Email or Password incorrect!");
      setIsLoading(false);
    }
  };
  const handleRegister = async (data) => {
    setIsLoading(true);
    const result_resgister = await apiRegister(data);
    if (result_resgister?.success) {
      setIsRegister(false);
      setIsCheckToken(true);
      setIsErrorRegister(false);
      setTextErrorRegister("");
      setIsLoading(false);
      Swal.fire({
        title: "Good job!",
        text: `${result_resgister.message}`,
        icon: "success",
      });
    } else {
      setIsErrorRegister(true);
      setTextErrorRegister("Email or Mobile already exists");
      setIsLoading(false);
    }
  };
  const handleForgotPassword = async (data) => {
    setIsLoading(true);
    const result = await apiForgotPassword({ email: emailResetPassword });
    console.log(result);
    if (result?.success) {
      setEmailResetPassword("");
      setIsLoading(false);
      toast.success(`${result.message}`);
    } else {
      toast(`${result?.data?.message}`);
    }
  };
  const handleToggleLoginOrRegister = () => {
    setIslogin((prev) => !prev);
    setIsRegister((prev) => !prev);
    setIsErrorLogin(false);
    setTextErrorLogin("");
  };
  const handleToggleForgotPassword = () => {
    setIslogin(false);
    setIsRegister(false);
    setIsForgotpassword(true);
    setIsErrorLogin(false);
    setTextErrorLogin("");
  };
  const handleKeyPress = (e) => {
    // Ngăn không cho nhập ký tự không phải số
    if (!/[\d]/.test(e.key) && e.key !== "Bankspace") {
      e.preventDefault();
    }
  };
  const handleSubmitRegister = async () => {
    const result = await apiAcccount_register(token);
    if (result?.success) {
      setIslogin(true);
      setToken("");
      Swal.fire({
        title: "Good job!",
        text: "Register successfully",
        icon: "success",
      });
      setIsCheckToken(false);
    } else {
      setTextErrorToken("Expired code");
      setToken("");
    }
  };
  useEffect(() => {
    const timeOutLogin = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(getCurrentUser());
      }
    }, 500);
    return () => {
      clearTimeout(timeOutLogin);
    };
  }, [isLoggedIn, dispatch]);
  useEffect(() => {
    const handleClickOutOption = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) {
        setIsShowOption(false);
      }
    };
    document.addEventListener("click", handleClickOutOption);
    return () => {
      document.addEventListener("click", handleClickOutOption);
    };
  }, []);

  return (
    <>
      <div className="homeHeader w-full flex flex-col">
        <div className="topHeader bg-[#ee3231] text-white flex flex-col items-center py-[10px] text-[13px]">
          <div className="flex justify-between w-main">
            <div className="left-area flex items-center">
              <div className="pr-4 font-semibold">
                ORDER ONLINE OR CALL US (+1800) 000 8808
              </div>
              <div className="flex gap-1 items-center px-2.5 p-0 border-l border-[#e5e7eb60]">
                {/* <span className=""><CiMoneyBill className="text-xl" /></span> */}
                <span className="text-xs">VND</span>
              </div>
            </div>
            {/*to={currentUser?.role === 1945 ? `/${path.ADMIN_URL}` : `/${path.MEMBER_URL}`}*/}
            {isLoggedIn && currentUser ? (
              <div className={`flex h-full items-center gap-4 relative`}>
                <div
                  id="profile"
                  className="flex items-center font-semibold gap-4 cursor-pointer"
                >
                  <div
                    onClick={() => setIsShowOption((prev) => !prev)}
                    className="hover:text-black relative"
                  >
                    <span>{`Welcom, ${currentUser?.firstname} ${currentUser?.lastname}`}</span>
                    {isShowOption && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bg-[#F0F0F0] top-8 left-0 right-[-15px] text-black flex flex-col p-2 rounded z-10"
                      >
                        <Link
                          to={`/${path.MEMBER_URL}/personal`}
                          className="hover:bg-gray-300 cursor-pointer p-2 flex items-center gap-2 rounded"
                        >
                          <IoPerson />
                          <span>Personal</span>
                        </Link>
                        {currentUser?.role === 1945 && (
                          <span className="p-2 hover:bg-gray-300 cursor-pointer rounded">
                            <Link
                              to={`/${path.ADMIN_URL}`}
                              className="flex items-center gap-2"
                            >
                              <MdAdminPanelSettings />
                              <span>Administrator</span>
                            </Link>
                          </span>
                        )}
                        <span
                          onClick={() => dispatch(logout())}
                          className="p-2 hover:bg-gray-300 cursor-pointer flex items-center gap-2 rounded"
                        >
                          <IoLogOut className="mt-[1px]" />
                          <span>Logout</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-[2px]">
                    <span className="px-[8px] border-l border-[#e5e7eb60]">
                      <FaFacebook className="cursor-pointer hover:text-black" />
                    </span>
                    <span className="px-[8px] border-l border-[#e5e7eb60]">
                      <FaTwitter className="cursor-pointer hover:text-black" />
                    </span>
                    <span className="px-[8px] border-l border-[#e5e7eb60]">
                      <GrInstagram className="cursor-pointer hover:text-black" />
                    </span>
                    <span className="px-[8px] border-l border-[#e5e7eb60]">
                      <BsGoogle className="cursor-pointer hover:text-black" />
                    </span>
                    <span className="px-[8px] border-l border-[#e5e7eb60]">
                      <IoLogoPinterest className="cursor-pointer hover:text-black" />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="right-area flex items-center gap-2">
                <div
                  onClick={() => setIsLoginOrRegister((prev) => !prev)}
                  className="text-white font-semibold hover:text-[black] cursor-pointer"
                >
                  Sign In or Create Account
                </div>
                <div className="flex items-center justify-center mt-[2px]">
                  <span className="px-[8px] border-l border-[#e5e7eb60]">
                    <FaFacebook className="cursor-pointer hover:text-black" />
                  </span>
                  <span className="px-[8px] border-l border-[#e5e7eb60]">
                    <FaTwitter className="cursor-pointer hover:text-black" />
                  </span>
                  <span className="px-[8px] border-l border-[#e5e7eb60]">
                    <GrInstagram className="cursor-pointer hover:text-black" />
                  </span>
                  <span className="px-[8px] border-l border-[#e5e7eb60]">
                    <BsGoogle className="cursor-pointer hover:text-black" />
                  </span>
                  <span className="px-[8px] border-l border-[#e5e7eb60]">
                    <IoLogoPinterest className="cursor-pointer hover:text-black" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sectionHeader flex items-center justify-center pb-[30px] pt-[20px] text-sm">
          <div className="w-main flex justify-between items-center h-[44px]">
            <div className="flex items-center w-[30%]">
              <Link to={`/${Path.HOME_URL}`}>
                <img
                  src={logo}
                  alt="logo"
                  className="w-[245px] object-contain"
                />
              </Link>
            </div>
            <div className="pl-[20px] flex items-center w-[70%] h-[40px] justify-end">
              <div className="flex flex-col gap-1 px-[20px] border-r">
                <div className="flex items-center font-semibold gap-1">
                  <FaPhoneAlt className="text-main" />
                  <span className="ml-2">(+1800) 000 8808</span>
                </div>
                <div className="text-xs">Mon-Sat 9:00AM - 8:00PM</div>
              </div>
              <div className="flex flex-col gap-1 text-center px-[20px] border-r">
                <div className="flex items-center font-semibold gap-1">
                  <MdEmail className="text-main" />
                  <span className="ml-2 uppercase">
                    {" "}
                    support@tadathemes.com
                  </span>
                </div>
                <div className="text-xs">Online Support 24/7</div>
              </div>
              <div className="flex px-[20px] h-full relative">
                <Link
                  to={`/${path.PAGE_WISHLIST_URL}`}
                  className="flex items-center font-semibold gap-1"
                >
                  <CiHeart color="red" size={25} className="cursor-pointer" />
                </Link>
                <div className="absolute right-4 top-0 w-4 h-4 bg-main rounded-full text-white flex justify-center items-center">
                  <span className="text-xs">{wishListLocal?.length || 0}</span>
                </div>
              </div>
              <div
                onClick={() =>
                  dispatch(showRightCart({ isShowRightCart: true }))
                }
                className="flex cursor-pointer items-center gap-2 px-[20px] border-l h-full"
              >
                <div>
                  <FaShoppingBag className="text-main text-xl" />
                </div>
                <div className="flex items-center gap-1 font-semibold hover:text-main">
                  <span>{currentUser?.cart.length || 0}</span>
                  <span>items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navigation />
      </div>
      {isLoginOrRegister && (
        <div
          onClick={() => setIsLoginOrRegister((prev) => !prev)}
          className="fixed flex justify-center items-center top-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] bottom-0 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[30%] relative"
          >
            {isLogin && (
              <div className="w-full relative p-5 flex flex-col gap-5 justify-center items-center animate-fade-in">
                <h3 className="uppercase font-semibold text-xl text-[#505050]">
                  {isLogin ? "Login" : "Create Account"}
                </h3>
                <form
                  method="POST"
                  onSubmit={handleSubmit((data) => handleLogin(data))}
                  className="w-full flex flex-col gap-[15px]"
                >
                  {isErrorLogin && (
                    <p className="px-[12px] py-[6px] border-2 border-solid border-red-200 text-sm">
                      {textErrorLogin}
                    </p>
                  )}
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "This is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      autoComplete="email"
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your Email"
                    />
                    <small className="text-main">
                      {errors?.email?.message}
                    </small>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      {...register("password", {
                        required: "This is required",
                      })}
                      type="password"
                      autoComplete="current-password"
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your Password"
                    />
                    <small className="text-main">
                      {errors?.password?.message}
                    </small>
                  </div>
                  <button
                    type="submit"
                    className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                  >
                    {isLoading ? "Loading..." : "SIGN IN"}
                  </button>
                </form>
                <div className="flex justify-between items-center w-full">
                  <p
                    onClick={() => handleToggleForgotPassword()}
                    className="hover:text-main hover:underline cursor-pointer text-blue-500"
                  >
                    Forgot your password?
                  </p>
                  <p
                    onClick={() => handleToggleLoginOrRegister()}
                    className="hover:text-main text-blue-500 hover:underline cursor-pointer"
                  >
                    Create Account
                  </p>
                </div>
              </div>
            )}
            {isRegister && (
              <div className="w-full relative p-5 flex flex-col gap-5 justify-center items-center">
                <h3 className="uppercase font-semibold text-xl text-[#505050]">
                  Create Account
                </h3>
                <form
                  method="POST"
                  onSubmit={handleSubmit((data) => handleRegister(data))}
                  className="w-full flex flex-col gap-[15px]"
                >
                  {isErrorRegister && (
                    <p className="px-[12px] py-[6px] border-2 border-solid border-red-200 text-sm">
                      {textErrorRegister}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="firstname"
                          className="text-sm font-medium text-[#505050]"
                        >
                          First Name
                        </label>
                        <small className="text-main">
                          {errors?.firstname?.message}
                        </small>
                      </div>
                      <input
                        type="text"
                        id="firstname"
                        {...register("firstname", {
                          required: "This is required",
                        })}
                        autoComplete="given-name"
                        className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="lastname"
                          className="text-sm font-medium text-[#505050]"
                        >
                          Last Name
                        </label>
                        <small className="text-main">
                          {errors?.lastname?.message}
                        </small>
                      </div>
                      <input
                        type="text"
                        id="lastname"
                        {...register("lastname", {
                          required: "This is required",
                        })}
                        autoComplete="family-name"
                        className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      {...register("email", {
                        required: "This is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your Email"
                    />
                    <small className="text-main">
                      {errors?.email?.message}
                    </small>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="mobile"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      {...register("mobile", { required: "This is required" })}
                      autoComplete="tel"
                      onKeyPress={handleKeyPress}
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your phone"
                    />
                    <small className="text-main">
                      {errors?.mobile?.message}
                    </small>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      {...register("password", {
                        required: "This is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      autoComplete="current-password"
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your Password"
                    />
                    <small className="text-main">
                      {errors?.password?.message}
                    </small>
                  </div>
                  <button
                    type="submit"
                    className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                  >
                    {isLoading ? "Loading..." : "Create"}
                  </button>
                </form>
                {/* <button onClick={() => handleToggleLoginOrRegister()} className="bg-main text-white py-2 px-3 rounded hover:bg-[#474747] uppercase">Cancel</button> */}
                <p
                  onClick={() => {
                    handleToggleLoginOrRegister();
                    setTextErrorRegister("");
                    setIsErrorRegister(false);
                  }}
                  className="hover:text-main hover:underline cursor-pointer text-blue-500"
                >
                  Cancel
                </p>
              </div>
            )}
            {isForgotPassword && (
              <div className="w-full relative p-5 flex flex-col gap-5 justify-center items-center">
                <h3 className="uppercase font-semibold text-xl text-[#505050]">
                  Reset your password
                </h3>
                <form
                  method="POST"
                  onSubmit={handleSubmit((data) => handleForgotPassword(data))}
                  className="w-full flex flex-col gap-[15px]"
                >
                  <p className="px-[12px] py-[6px] border-2 border-solid border-red-200 text-sm">
                    We will send you an email to reset your password.
                  </p>
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[#505050]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={emailResetPassword}
                      onChange={(e) => setEmailResetPassword(e.target.value)}
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                    >
                      {isLoading ? "Loading..." : "submit"}
                    </button>
                    <button
                      onClick={() => {
                        setIslogin(true);
                        setIsForgotpassword(false);
                        setIsRegister(false);
                      }}
                      type="button"
                      className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                    >
                      cancer
                    </button>
                  </div>
                </form>
              </div>
            )}
            {isCheckToken && (
              <div className="w-full relative p-5 flex flex-col gap-5 justify-center items-center">
                <h3 className="uppercase font-semibold text-xl text-[#505050]">
                  CHECKCODE
                </h3>
                <form
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitRegister();
                  }}
                  className="w-full flex flex-col gap-[15px]"
                >
                  <p className="px-[12px] py-[6px] border-2 border-solid border-red-200 text-sm">
                    {textErrorToken ||
                      "We sent a code to your email. Please check your email and enter your code :"}
                  </p>
                  <div className="w-full">
                    <label
                      htmlFor="token"
                      className="text-sm font-medium text-[#505050]"
                    >
                      CODE
                    </label>
                    <input
                      id="token"
                      name="token"
                      type="text"
                      required
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full py-2 px-3 border bg-[#f6f6f6] rounded"
                      placeholder="Enter your code"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                    >
                      submit
                    </button>
                    <button
                      onClick={() => {
                        setIslogin(true);
                        setIsForgotpassword(false);
                        setIsRegister(false);
                        setIsCheckToken(false);
                        setTextErrorToken(null);
                      }}
                      type="button"
                      className="uppercase hover:bg-[#474747] w-full bg-main py-2 text-white rounded"
                    >
                      cancer
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div
              onClick={() => setIsLoginOrRegister((prev) => !prev)}
              className="absolute top-0 right-0 cursor-pointer z-50"
            >
              <IoIosClose size={44} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Header);
