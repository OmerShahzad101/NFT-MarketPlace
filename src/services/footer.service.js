import axios from "axios";

const footer = {
  footerlink: (url) => {
    return axios.get(url);
  },
};
export default footer;
