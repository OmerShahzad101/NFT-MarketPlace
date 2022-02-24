import axios from "axios";

const contact = {
  contacts: (url, data) => {
    return axios.post(url, data);
  },
};
export default contact;
