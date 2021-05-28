import axios from "axios";

const baseURL = "http://localhost:3333"; // local (dev)
// const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1NzNmZjBmLTNkNzQtNDgxNi1iNmJmLTU5OThjZDY5NzJjMyIsImlhdCI6MTYyMjE2OTA4MywiZXhwIjoxNjIzNDY1MDgzfQ.Ysn3Iq6dsz8erQJcLtD8ckXTzVrwZT6Ee9I-hFJCpK8";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
