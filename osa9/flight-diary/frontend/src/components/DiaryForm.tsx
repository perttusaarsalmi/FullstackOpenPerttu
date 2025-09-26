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
            placeholder="yyyy-mm-dd"
            value={newDiaryDate}
            onChange={(event) => setNewDiaryDate(event.target.value)}
          />
        </div>
        <div>
          visibility{' '}
          <input
            placeholder="Enter visibility information"
            value={newDiaryVisibility ?? ''}
            onChange={(event) =>
              setNewDiaryVisibility(event.target.value as Visibility)
            }
          />
        </div>
        <div>
          weather{' '}
          <input
            placeholder="Enter weather information"
            value={newDiaryWeather ?? ''}
            onChange={(event) =>
              setNewDiaryWeather(event.target.value as Weather)
            }
          />
        </div>
        <div>
          comment{' '}
          <input
            placeholder="New diary comment"
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
