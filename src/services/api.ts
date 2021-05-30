import axios from "axios";

const baseURL = "http://192.168.0.20:3333"; // local (dev)
// const baseURL = "https://secret-lowlands-42826.herokuapp.com"; // staging
// const baseURL = "https://api-moderacompra.herokuapp.com"; // prod

const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwOTNhNTA2LTZhNDMtNGQzNi04YWY0LWUzYWEzNTc3YTY3MiIsImlhdCI6MTYyMjI1MzQ0MiwiZXhwIjoxNjIzNTQ5NDQyfQ.q_xn61OkQoe_R9ksBSV-t0axhPi93unAd3YGjN3vcWk";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${hardCodedToken}`,
  },
});

export default api;
