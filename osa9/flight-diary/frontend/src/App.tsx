import { useState, useEffect } from 'react';
import diaryService from './services/diraryService';
import type { Diary, NewDiaryEntry, Visibility, Weather } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import './index.css';
import { AxiosError } from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await diaryService.getAll();
        setDiaries(data);
      } catch (error) {
        setNotificationMessage(
          error instanceof Error ? error.message : String(error)
        );
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
        let message = 'Unknown error';
        if (error instanceof AxiosError && error.response?.data) {
          if (typeof error.response.data === 'string') {
            message = error.response.data.replace(
              /^Something went wrong\./,
              ''
            );
          } else {
            message = JSON.stringify(error.response.data);
          }
        } else {
          message = String(error);
        }
        setNotificationMessage(message);
      });
  };

  const setNotificationMessage = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  return (
    <div>
      <DiaryForm
        addNewDiary={addNewDiary}
        notification={notification}
      ></DiaryForm>
      <DiaryList diaries={diaries}></DiaryList>
    </div>
  );
};

export default App;
