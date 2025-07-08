import axios from "../axios";

export const apiRegister = (data) => axios({
  url : '/user/register',
  method : 'POST',
  data,
  withCredentials : true // Cho phép gửi cookie và thông tin xác thực
})
export const apiAcccount_register = (token_activate) => axios({
  url : 'user/accountRegister/' + token_activate,
  method : 'PUT',
})
export const apiLogin = (data) => axios({
  url : '/user/login',
  method : 'POST',
  data
})
export const apiGetCurrentUser = () => axios({
  url : '/user/getOne',
  method: 'GET',
})
export const apiForgotPassword = (data) => {
  try {
    return axios({
      url : '/user/forgotPassword',
      method : 'POST',
      data
    })
  } catch (error) {
    throw error
  }
}
export const apiResetPassword = (data) => {
  try {
    return axios({
      url : '/user/resetPassword',
      method : 'PUT',
      data
    })
  } catch (error) {
    throw error
  }
} // updateUser
export const apiUpdateUser = (data) => {
  try {
    console.log(data);
    return axios({
      url : '/user/updateUser',
      method : 'PUT',
      data
    })
  } catch (error) {
    throw error
  }
}
export const apiGetUsers = (params) => {
  try {
    console.log(params);
    return axios({
      url : '/user/getUsers',
      method : 'GET',
      params,
    })
  } catch (error) {
    throw error
  }
}
export const apiUpdateUserAdmin = (data,_id) => {
  try {
    return axios({
      url :  `/user/updateUserByAdmin/${_id}`,
      method : 'PUT',
      data,
    })
  } catch (error) {
    throw error
  }
}