import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;
const Statistics = (props) => {
  return (
    <div>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.getAllAmount()}</div>
      <div>average {props.getAverage().toFixed(2)}</div>
      <div>positive {props.getPositiveAverage().toFixed(2)} %</div>
    </div>
  );
};


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

  const getAllAmount = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    if (getAllAmount() === 0) return 0;
    return (good * 1 + neutral * 0 + bad * -1) / getAllAmount();
  };

  const getPositiveAverage = () => {
    if (good == 0) return 0;
    return (good / getAllAmount()) * 100;
  };

  return (
    <div>
      <Title title="give feedback" />
      <br></br>
      <Button onClick={() => setToGood(good + 1)} text="good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setToBad(bad + 1)} text="bad" />
      <Title title="statistics"></Title>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        getAllAmount={getAllAmount}
        getAverage={getAverage}
        getPositiveAverage={getPositiveAverage}
      />
    </div>
  );
};

export default App;
