import axios from "axios";

const authors = {
  authorsList: (url) => {
    return axios.get(url);
  },
};

export default authors;
