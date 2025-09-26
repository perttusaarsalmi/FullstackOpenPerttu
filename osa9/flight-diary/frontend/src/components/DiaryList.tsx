import { type Diary } from '../types';
import Header from '../components/Header';
import DiaryEntry from './DiaryEntry';

const DiaryList = (props: { diaries: Diary[] }) => {
  return (
    <div>
      <Header headerText={'Diary entries'}></Header>
      {props.diaries.map((diary) => (
        <DiaryEntry key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryList;
