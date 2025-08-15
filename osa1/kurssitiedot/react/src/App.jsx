const App = () => {
  const Header = ({ course }) => <h1>{course}</h1>;

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const items = [
    { label: course.parts[0].name, count: course.parts[0].exercises },
    { label: course.parts[1].name, count: course.parts[1].exercises },
    { label: course.parts[2].name, count: course.parts[2].exercises },
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
      <Header course={course.name} />

      <Content items={items} />

      <Total exercises={items.map((item) => item.count)} />
    </div>
  );
};

export default App;
