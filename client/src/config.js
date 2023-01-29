import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});
// import axios from "axios";
// export const axiosInstance = axios.create({
//   baseURL: "https://energy-shelf.herokuapp.com/api/",
// });
