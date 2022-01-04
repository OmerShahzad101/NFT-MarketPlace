import axios from "axios";

const faqs = {
  faq: (url) => {
    return axios.get(url);
  },
};
export default faqs;
