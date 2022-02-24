import axios from "axios";

const Collection = {
  collection: (url, user) => {
    return axios.get(url, user);
  },

  collectionPost: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
};
export default Collection;
