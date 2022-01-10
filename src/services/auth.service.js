import axios from "axios";

const AuthService = {
  register: (url, user) => {
    console.log(user)
    return axios.post(url, user);
  },

  login: (url, user) => {
    console.log(user)
    return axios.post(url, user);
  },


};
export default AuthService;


