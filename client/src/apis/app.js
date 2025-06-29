import axios from "../axios";

export const apiGetProductCategories = async () => {
  try {
    return axios({
      url: "/productCategory/getProductCategories",
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};
