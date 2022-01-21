import axios from "axios";

const authors = {
  authorsList: (url , data) => {
    return axios.get(url , data);
  },
  specificAuthor: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
    console.log(requestOptions);
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
  specificAuthorNft: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    };
    console.log(requestOptions);
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
};

export default authors;
