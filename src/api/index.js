import axios from "axios";

const URL = "https://e-app-server.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
