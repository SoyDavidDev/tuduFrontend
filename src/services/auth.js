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
      document.cookie = `accessToken=${response.data.access}; path=/; max-age=3600`; 
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
    localStorage.setItem('setLoggedIn', false);
  },

  async register(username, first_name, last_name, email, password) {
    try{
      const response = await axios.post(URLCreateUser, {
        username,
        first_name,
        last_name,
        email,
        password,
      });
      console.log('Register success');
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      console.log('Error in register');
      throw error;
    }
  },



  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken){
      console.log('No refresh token');
      return;
    } else{
      try{
        const response = await axios.post(URLToken + "refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });
        localStorage.setItem("accessToken", response.data.access);
        document.cookie = `accessToken=${response.data.access}; path=/; max-age=3600`;
        return response.data;
      } catch (error){
        console.log('Error in refresh token');
        console.log(error);
      }
    }

  },
}