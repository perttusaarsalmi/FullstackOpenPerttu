import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => {
    setGood(newValue);
  };

  const setToNeutral = (newValue) => {
    setNeutral(newValue);
  };

  const setToBad = (newValue) => {
    setBad(newValue);
  };

  return (
    <div>
      <Title title="give feedback" />
      <br></br>
      <Button onClick={() => setToGood(good + 1)} text="good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setToBad(bad + 1)} text="bad" />
      <Title title="statistics"></Title>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  );
};

export default App;
