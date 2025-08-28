const SummaryRow = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <strong>total of {totalExercises} exercises</strong>
    </div>
  );
};

export default SummaryRow;
