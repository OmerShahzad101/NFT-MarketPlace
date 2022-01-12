import axios from "axios";

const authors = {
  authorsList: (url , data) => {
    return axios.get(url , data);
  },
};

export default authors;
