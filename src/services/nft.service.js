import axios from "axios";

const NFT = {
  nft: (url, data) => {
    console.log(data);
    return axios.post(url, data);
  },

  nftget: (url, data) => {
    return axios.get(url, data);
  },
};
export default NFT;
