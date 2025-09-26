import axios from "axios";
import { type Diary, type NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`); // Huomaa: diaries, ei patients
  return data;
};

const createDiary = async (newObject: NewDiaryEntry) => {
  const response = await axios.post(`${apiBaseUrl}/diaries`, newObject);
  return response.data;
};

export default {
  getAll, createDiary
};
