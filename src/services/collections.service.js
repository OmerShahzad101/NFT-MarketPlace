import axios from "axios";

const Collection = {
  

  collection: (url, user) => {
    console.log(user)
    return axios.get(url, user);
  },


};
export default Collection;
