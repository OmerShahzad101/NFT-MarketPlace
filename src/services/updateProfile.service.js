import axios from "axios";
const updateProfile = {
  updateProfileUser: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    console.log("JSON.stringify(data)", data);
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
  updateProfileUserGet: (url, data) => {
    var _token = JSON.parse(localStorage.getItem("access"));
    const requestOptions = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
};
export default updateProfile;
