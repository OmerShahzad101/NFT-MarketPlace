import axios from "axios";
const favoriteNft = {
  favoriteNftGet: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    console.log(requestOptions);
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },

  favoriteNftPost: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    console.log(requestOptions);
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },

  saleTypeGet: (url, data) => {
    return axios.get(url, data);
    console.log(data)
  },
};
export default favoriteNft;
