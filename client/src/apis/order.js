import axios from "../axios";
export const apiCreateOrder = (data) => {
  try {
    return axios({
      url : '/order/createOrder',
      method : 'POST',
      data
    })
  } catch (error) {
    throw error
  }
}
export const apiGetOrdersUser = () => {
  try {
    return axios({
      url : '/order/getOrdersUser',
    })
  } catch (error) {
    throw error
  }
}