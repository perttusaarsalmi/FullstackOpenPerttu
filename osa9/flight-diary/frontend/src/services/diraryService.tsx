import axios from "axios";
import { type Diary } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`); // Huomaa: diaries, ei patients
  return data;
};

export default {
  getAll,
};
