import axios from "axios";
const updateProfile = {
    updateProfileUser: (url) => {
    return axios.put(url);
  },
  updateProfileUserGet: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    console.log(data);
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
    //console.log(data);
    return _data;
  },
};
export default updateProfile;
