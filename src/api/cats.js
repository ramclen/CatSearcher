import axios from "axios";

export default axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
});
