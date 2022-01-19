import axios from "axios";

const liveAuction = {
  auction: (url) => {
    return axios.get(url);
  },
};
export default liveAuction;
