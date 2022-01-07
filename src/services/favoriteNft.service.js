import axios from "axios";

const favoriteNft = {
  favoriteNftGet: (url, user) => {
    return axios.get(url, user);
  },

  favoriteNftPost: (url, data) => {
    return axios.post(url, data);
  },
};
export default favoriteNft;
