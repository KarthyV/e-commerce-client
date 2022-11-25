import axios from "axios";

const URL = "https://e-commerce-server-seven.vercel.app";

export default axios.create({
  baseURL: URL,
});
