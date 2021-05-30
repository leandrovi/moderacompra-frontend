import axios from "axios";

const baseURL = "http://192.168.0.105:3333"; // local (dev)
//const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYzMTZjNGRkLWZlNTYtNDVkZS04ZWY1LTRmYTQ5ZDU4M2E1NCIsImlhdCI6MTYyMjMxMDQwNSwiZXhwIjoxNjIzNjA2NDA1fQ.8-g394D8WHj4LaCilb5-0eZJu8VmLy-Wgm3WQKVKBuo";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
