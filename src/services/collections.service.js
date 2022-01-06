import axios from "axios";

const Collection = {
  collection: (url, user) => {
    return axios.get(url, user);
  },

  collectionPost: (url, data) => {
    return axios.post(url, data);
  },
};
export default Collection;
