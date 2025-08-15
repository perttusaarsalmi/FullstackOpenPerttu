const App = () => {
  const Header = ({ course }) => <h1>{course}</h1>;

  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const items = [
    { label: part1, count: exercises1 },
    { label: part2, count: exercises2 },
    { label: part3, count: exercises3 },
  ];

  const Part = ({ label, count }) => (
    <p>
      {label} {count}
    </p>
  );

  const Content = ({ items }) => {
    return (
      <div>
        <Part label={items[0].label} count={items[0].count} />
        <Part label={items[1].label} count={items[1].count} />
        <Part label={items[2].label} count={items[2].count} />
      </div>
    );
  };

  const Total = ({ exercises }) => (
    <p>Number of exercises {exercises.reduce((a, b) => a + b, 0)}</p>
  );

  return (
    <div>
      <Header course={course} />

      <Content items={items} />

      <Total exercises={items.map((item) => item.count)} />
    </div>
  );
};

export default App;
