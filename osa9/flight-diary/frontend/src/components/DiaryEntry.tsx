import type { Diary } from '../types';

const DiaryEntry = (props: {diary: Diary}) => {

    return (
        <div>
            <h3>{props.diary.date}</h3>
            <div>visibility: {props.diary.visibility}</div>
            <div>weather: {props.diary.weather}</div>
        </div>
    );
};

export default DiaryEntry;