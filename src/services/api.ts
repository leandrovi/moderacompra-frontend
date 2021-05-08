import axios from "axios";

// const baseURL = "http://187.3.218.117:3333"; // local (dev)
const baseURL = "https://secret-lowlands-42826.herokuapp.com/modera"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const api = axios.create({
  baseURL: baseURL,
});

export default api;
