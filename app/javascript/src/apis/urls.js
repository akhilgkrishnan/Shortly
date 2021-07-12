import axios from "axios";

const list = () => axios.get("/urls");
const create = payload => axios.post("/urls/", payload);

const urlsApi = {
  list,
  create,
};

export default urlsApi;
