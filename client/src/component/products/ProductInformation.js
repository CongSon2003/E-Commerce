import React, { memo, useCallback, useState } from "react";
import { productTabs } from "../../ultils/contant";
import { apiRatings } from "../../apis";
import { showModal } from "../../store/app/appSlice";
import { renderStarProduct } from "../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { VoteContent, VoteBar } from "../vote";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Comment from "../vote/Comment";
// import { FaSquare } from "react-icons/fa6";
const ProductInformation = ({ product, handleIsUpdate }) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useSelector((state) => state.userReducer);
  const handleSubmitVote = useCallback(
    async ({ comment, score }) => {
      if (!comment || !score) {
        return;
      }
      const result = await apiRatings({
        star: score,
        comment,
        pid: product?._id,
        updatedAt: Date.now(),
      });
      if (result.success) {
        handleIsUpdate();
        dispatch(showModal({ isShowModel: false, dataModel: null }));
      }
    },
    [product, dispatch, handleIsUpdate]
  );
  const handleVote = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Oops!",
        text: "Please login to rate the product.",
        icon: "error",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Go to login",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModel: true,
          dataModel: (
            <VoteContent
              handleSubmitVote={handleSubmitVote}
              nameProduct={product?.title}
            />
          ),
        })
      );
    }
  };
  return (
    <div className="border-b">
      <ul className="flex items-center gap-1">
        {productTabs?.map(({ name, id }) => (
          <li
            key={id}
            onClick={() => setActiveTab(id)}
            className={`uppercase py-[9px] px-[20px] ${
              activeTab === id
                ? "border-t border-l border-r cursor-pointer"
                : "border bg-[#f1f1f1] hover:bg-white cursor-pointer"
            } bg-white`}
          >
            {name}
          </li>
        ))}
        <li
          onClick={() => setActiveTab(5)}
          className={`uppercase py-[9px] px-[20px] ${
            activeTab === 5
              ? "border-t border-l border-r cursor-pointer"
              : "border bg-[#f1f1f1] hover:bg-white cursor-pointer"
          } bg-white`}
        >
          Customer Review
        </li>
      </ul>
      <div className="border mt-[-1px] p-5">
        {productTabs?.some((element) => element.id === activeTab) && (
          <h2 className="font-semibold uppercase text-xl text-[#505050] mb-3">
            {productTabs.find((item) => item.id === activeTab).title}
          </h2>
        )}
        {activeTab === 5 && (
          <h2 className="font-semibold uppercase text-xl text-[#505050] mb-3">
            Customer Reviews
          </h2>
        )}
        {productTabs?.some((element) => element.id === activeTab) && (
          <p className="text-[#505050]">
            {productTabs?.find((item) => item.id === activeTab).content}
          </p>
        )}
        {activeTab === 5 && (
          <div className="text-[#505050] flex gap-2">
            <div className="w-2/5 border flex flex-col justify-center items-center gap-2 p-[20px]">
              <div className="flex flex-col justify-center items-center gap-2">
                <div>
                  <span className="text-[#18181b] font-medium text-4xl">
                    {product?.totalRatings || 0}
                  </span>
                  /5
                </div>
                <div className="flex gap-3">
                  {renderStarProduct(product?.totalRatings)?.map(
                    (star) => star
                  )}
                </div>
                <span>{product?.ratings?.length || 0} reviews</span>
              </div>
              <button
                onClick={handleVote}
                type="button"
                className="p-2 bg-main rounded-lg text-white"
              >
                Write a review
              </button>
            </div>
            <div className="w-3/5 border flex flex-col gap-2 justify-center p-[20px]">
              {Array.from(Array(5).keys())
                .reverse()
                .map((number) => (
                  <VoteBar
                    number={number + 1}
                    key={number}
                    countRatings={
                      product?.ratings.filter((el) => el.star === number + 1)
                        .length
                    }
                    ratingsTotal={product?.ratings?.length}
                  />
                ))}
            </div>
          </div>
        )}
        {activeTab === 5 && (
          <div className="mt-5 border flex flex-col gap-1">
            {product?.ratings?.map((el) => (
              <Comment
                key={el._id}
                star={el.star}
                name={`${currentUser?.firstname} ${currentUser?.lastname}`}
                updatedAt={el.updatedAt}
                comment={el.comment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
