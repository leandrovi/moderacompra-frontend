import axios from "axios";

// const baseURL = "http://192.168.0.20:3333"; // local (dev)
const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

// const hardCodedToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMzgzZGI2LTVlOTYtNDVmNi1hN2MyLTk0MTc3NjJkNzFjOCIsImlhdCI6MTYyMjQ5OTE5OSwiZXhwIjoxNjIzNzk1MTk5fQ.1pOTyd7GlaXrTPG_JzcOPR2dSaZEXwLboUA6Evx0qLE";

const api = axios.create({
  baseURL: baseURL,
  // headers: {
  //   Authorization: `Bearer ${hardCodedToken}`,
  // },
});

export default api;
