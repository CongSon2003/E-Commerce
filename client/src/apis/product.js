import axios from "../axios";

export const apigetProducts = (params) => {
  try {
    return axios({
      url : '/product/getProducts',
      method : 'GET',
      params
    })
  } catch (error) {
    throw error
  }
}
export const apigetOneProduct = (productId) => {
  try {
    return axios({
      url : '/product/getOneProduct/' + productId,
      method : 'GET',
    })
  } catch (error) {
    throw error
  }
}
export const apiRatings = (data) => {
  try {
    return axios({
      url : '/product/ratings',
      method : 'put',
      data
    })
  } catch (error) {
    throw error
  }
}