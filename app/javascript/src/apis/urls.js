import axios from "axios";

const list = () => axios.get("/urls");

const urlsApi = {
  list,
};

export default urlsApi;
