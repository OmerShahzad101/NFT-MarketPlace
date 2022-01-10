import axios from "axios";

const Collection = {
  collection: (url, user) => {
    return axios.get(url, user);
  },

  collectionPost: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    console.log(data);
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
    console.log(data);
    return _data;
  },
};
export default Collection;


  // collectionPost: (url, data) => {
  //   return axios.post(url, data);
  // },