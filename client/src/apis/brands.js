import axios from "../axios";

export const apigetBrands = () => {
  try {
    return axios({
      url : '/brand/getBrands',
      method : 'GET',
    })
  } catch (error) {
    throw error
  }
}