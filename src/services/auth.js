import axios from "axios";

const URLToken = 'http://127.0.0.1:8000/api/v1/token/';
const URLCreateUser = 'http://127.0.0.1:8000/api/v1/users/create/';

export default {
  async login(username, password) {
    try {
      const response = await axios.post(URLToken, {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("user_id", response.data.id);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  logout() {
    console.log("logout");
    console.log(localStorage.getItem("accessToken"));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");
  },

  register(username, first_name, last_name, email, password) {
    try{
      const response = axios.post(URLCreateUser, {
        username,
        first_name,
        last_name,
        email,
        password,
      });
      console.log('Register success');
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in register')
      return error.response.data;
    }
  },



  async refreshToken() {
    try {
      const response = await axios.post(URLToken + "refresh/", {
        refresh: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", response.data.access);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
}