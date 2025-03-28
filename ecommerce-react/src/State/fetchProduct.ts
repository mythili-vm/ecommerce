import axios from "axios";
import { API_URL } from "../config/Api";

const api = API_URL + "/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(api);
    console.log(response, "response");
  } catch (e) {
    console.log(e);
  }
};
