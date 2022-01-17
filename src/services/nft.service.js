import axios from "axios";

const NFT = {
  nft: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    console.log(data);
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    // console.log(requestOptions);
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    console.log("datatat", data);
    return _data;
  },

  nftget: (url, data) => {
    return axios.get(url, data);
  },
};
export default NFT;

