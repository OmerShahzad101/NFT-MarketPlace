const AuthService = {
  register: (url, data) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },

  login: (url, data) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const _data = fetch(`${url}`, requestOptions).then((res) => res.json());
    return _data;
  },
};
export default AuthService;

