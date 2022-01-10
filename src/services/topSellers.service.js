import axios from "axios";

const topSellers = {
    topSellersList: (url) => {
    return axios.get(url);
  },
};

export default topSellers;
