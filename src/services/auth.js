import axios from "axios";

const URLToken = 'http://127.0.0.1:8000/api/v1/token/';

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