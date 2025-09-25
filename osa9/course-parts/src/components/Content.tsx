import type { CoursePart } from '../types';
import Part from './Part'

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
