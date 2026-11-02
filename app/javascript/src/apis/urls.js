import axios from "axios";

const list = (params = {}) => axios.get("/urls", { params });
const create = payload => axios.post("/urls", payload);
const update = ({ slug, payload }) => axios.put(`/urls/${slug}`, payload);
const destroy = slug => axios.delete(`/urls/${slug}`);

const urlsApi = {
  list,
  create,
  update,
  destroy,
};

export default urlsApi;
