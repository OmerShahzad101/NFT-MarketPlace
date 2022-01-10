import axios from "axios";

const AuthService = {
  register: (url, user) => {
    console.log(user)
    return axios.post(url, user);
  },

  login: (url, user) => {
    console.log(user)
    return axios.post(url, user);
  },


};
export default AuthService;



// login: (url, user) => {
//   // var _token = JSON.parse(localStorage.getItem("token"));

//   const requestOptions = {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       "Content-Type": "application/json",
//       access:
//         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNjI4NjUzLCJqdGkiOiI1YzliNzU3YWFmNzM0YjFlYmY0NjRiNTM5NzcxMmIxNSIsInVzZXJfaWQiOjV9.tYvAK-b4k0dINcdjdtSHydR8LxL0Z6JQqLwz0Sd2QEU",
//     },
//   };

//   console.log(url);
//   console.log(user);

//   const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
//   return _data;

//   // return axios.post(url, user);
// },
// };