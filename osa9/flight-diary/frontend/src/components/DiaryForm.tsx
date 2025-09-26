import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import type { Visibility, Weather } from '../types';
import Notification from './Notification';

const DiaryForm = (props: {
  addNewDiary: (
    event: React.SyntheticEvent,
    newDiaryDate: string,
    newDiaryVisibility: Visibility,
    newDiaryWeather: Weather,
    newDiaryComment: string
  ) => void;
  notification: string;
}) => {
  const [newDiaryDate, setNewDiaryDate] = useState<string>('');
  const [newDiaryVisibility, setNewDiaryVisibility] = useState<Visibility>();
  const [newDiaryWeather, setNewDiaryWeather] = useState<Weather>();
  const [newDiaryComment, setNewDiaryComment] = useState<string>('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!newDiaryVisibility || !newDiaryWeather) {
      alert('Please fill in both visibility and weather fields.');
      return;
    }
    props.addNewDiary(
      event,
      newDiaryDate,
      newDiaryVisibility,
      newDiaryWeather,
      newDiaryComment
    );
    setNewDiaryDate('');
    setNewDiaryWeather(undefined);
    setNewDiaryVisibility(undefined);
    setNewDiaryComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {props.notification && (
        <Notification notification={{ text: props.notification }} />
      )}

      <Form onSubmit={handleSubmit}>
        <div>
          date{' '}
          <input
            type="date"
            id="start"
            name="trip-start"
            value={newDiaryDate} // <-- use state here!
            min="1900-01-01"
            max="2025-12-31"
            onChange={(event) => setNewDiaryDate(event.target.value)}
          />
        </div>
        <div>
          visibility{' '}
          {(['great', 'good', 'ok', 'poor'] as Visibility[]).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={newDiaryVisibility === option}
                onChange={(event) =>
                  setNewDiaryVisibility(event.target.value as Visibility)
                }
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather{' '}
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as Weather[]).map(
            (option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={newDiaryWeather === option}
                  onChange={(event) =>
                    setNewDiaryWeather(event.target.value as Weather)
                  }
                />
                {option}
              </label>
            )
          )}
        </div>
        <div>
          comment{' '}
          <input
            placeholder="Write a comment"
            value={newDiaryComment}
            onChange={(event) => setNewDiaryComment(event.target.value)}
          />
        </div>
        <Button type="submit">add</Button>
      </Form>
    </div>
  );
};

export default DiaryForm;
