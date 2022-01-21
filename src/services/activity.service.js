import axios from "axios";

const activity = {
    activityGet: (url, user) => {
    return axios.get(url, user);
  },
};
export default activity;
