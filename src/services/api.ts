import axios from "axios";

// const baseURL = "http://192.168.0.20:3333"; // local (dev)
const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3OTFkYmEzLTlhNTItNDQ5Mi04OTllLTY3ZGZmZjg3Y2NjNiIsImlhdCI6MTYyMjQ5ODA4MywiZXhwIjoxNjIzNzk0MDgzfQ.62u7jm1jjGcaTzEOKB_IgtTInk_1rk9VWZAvpOjiY1o";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
