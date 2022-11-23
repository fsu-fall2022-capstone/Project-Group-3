import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { fetch_url } from "..";

export async function get_index() {
  const response = await Axios.get(`${fetch_url}/index`);
  return response;
}

export async function create_post(body) {
  Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  Axios.defaults.xsrfCookieName = "csrftoken";
  const response = await Axios.post(`${fetch_url}create_post`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await response.data;
}

export async function create_user(body) {
  Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  Axios.defaults.xsrfCookieName = "csrftoken";
  const response = await Axios.post(`${fetch_url}create_user`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await response.data;
}

export async function get_posts() {
  const response = await Axios.get(`${fetch_url}get_posts`);

  return response;
}

export async function get_users() {
  const response = await Axios.get(`${fetch_url}get_users`);

  return response;
}

export async function get_current_user(body) {
  let payload = { email: body };
  const params = new URLSearchParams(payload);
  const response = await Axios.get(`${fetch_url}get_current_user?${params}`);

  return response.data[0];
}
