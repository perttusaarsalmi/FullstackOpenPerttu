import { useState, useEffect } from "react";
import diaryService from "./services/diraryService";
import type { Diary } from "./types";
import DiaryList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await diaryService.getAll(); // No .data needed
        setDiaries(data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };
    fetchDiaries();
  }, []);

  return (
    <div>
      <DiaryList diaries={diaries}></DiaryList>
    </div>
  );
};

export default App;
