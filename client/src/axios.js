import axios from 'axios';
// Add a request interceptor

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let localStorageData = window.localStorage.getItem('persist:user');
  
  if (localStorageData && typeof localStorageData === 'string') {
    // Parse the string data from localStorage
    localStorageData = JSON.parse(localStorageData);
    
    // Ensure the accessToken is properly retrieved as a string
    const accessToken = JSON.parse(localStorageData.accessToken);
    // HTTP request : 
    config.headers = { Authorization : `Bearer ${accessToken}`}
    return config;
  } else { 
    return config;
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return error.response;
});

export default instance;