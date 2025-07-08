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
export const apiCreateProduct = (data) => {
  try {
    return axios({
      url : '/product/createProduct',
      method : 'POST',
      data
    })
  } catch (error) {
    throw error
  }
}
export const apiGetAllProduct = () => {
  try {
    return axios({
      url : '/product/getAllProduct',
      method : 'GET',
    })
  } catch (error) {
    throw error
  }
}
export const apiUpdateProduct = (productId,data) => {
  try {
    return axios({
      url : '/product/updateProduct/' + productId,
      method : 'PUT',
      data
    })
  } catch (error) {
    throw error
  }
}
export const apiDeleteProduct = (productId) => {
  try {
    return axios({
      url : '/product/deleteProduct/' + productId,
      method : 'DELETE',
    })
  } catch (error) {
    throw error
  }
}
export const apiAddVarriantProduct = (data, productId) => {
  try {
    return axios({
      url : 'product/varriant/' + productId,
      method : 'PUT',
      data
    })
  } catch (error) {
    throw error
  }
}