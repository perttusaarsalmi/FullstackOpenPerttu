import Header from './Header'
import Content from './Content'
import SummaryRow from './SummaryRow';

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <SummaryRow course={course} />
  </div>
);

export default Course;