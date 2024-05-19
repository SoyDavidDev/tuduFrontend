import axios from "axios";

const ENDPOINT_PATH = "http://127.0.0.1:8000/user/";
const ENDPOINT_PATH_LOGIN = "http://127.0.0.1:8000/user/login/";

export default {
  async register(name, email, password) {
    const user = { name, email, password };
    try {
      const response = await axios.post(ENDPOINT_PATH, user);
      console.log('User registered');
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Error 400: Bad Request');
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  },

  async login(email, password) {
    const user = {email, password };
    try {
      const response = await axios.post(ENDPOINT_PATH_LOGIN, user );
      console.log('User logged in');
      console.log(response);
      return response;
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Error 401: Unauthorized');
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  }
};