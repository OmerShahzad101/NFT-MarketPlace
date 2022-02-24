import axios from "axios";

const NFT = {
  nft: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },

  nftget: (url, data) => {
    return axios.get(url, data);
  },

  nftBiddingList: (url, data) => {
    return axios.get(url, data);
  }
};
export default NFT;
