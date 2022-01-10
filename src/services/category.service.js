import axios from "axios";

const Category = {
  category: (url, user) => {
    return axios.get(url, user);
  },
};
export default Category;
