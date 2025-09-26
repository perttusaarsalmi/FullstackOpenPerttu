import { useState, useEffect } from 'react';
import diaryService from './services/diraryService';
import type { Diary, NewDiaryEntry, Visibility, Weather } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await diaryService.getAll();
        setDiaries(data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };
    fetchDiaries();
  }, []);

  const addNewDiary = (
    event: React.SyntheticEvent,
    newDiaryDate: string,
    newDiaryVisibility: Visibility,
    newDiaryWeather: Weather,
    newDiaryComment: string
  ) => {
    event.preventDefault();
    const diaryObject: NewDiaryEntry = {
      date: newDiaryDate,
      visibility: newDiaryVisibility,
      weather: newDiaryWeather,
      comment: newDiaryComment,
    };
    diaryService
      .createDiary(diaryObject)
      .then((newDiary: Diary) => {
        setDiaries([...diaries, newDiary]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <DiaryForm addNewDiary={addNewDiary}></DiaryForm>
      <DiaryList diaries={diaries}></DiaryList>
    </div>
  );
};

export default App;
