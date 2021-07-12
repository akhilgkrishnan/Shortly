import axios from "axios";

const list = () => axios.get("/urls");
const create = payload => axios.post("/urls/", payload);
const update = ({ slug, payload }) => axios.put(`/urls/${slug}`, payload);

const urlsApi = {
  list,
  create,
  update,
};

export default urlsApi;
