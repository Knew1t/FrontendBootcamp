import { useEffect, useState } from "react";
import "./App.css";

function millToHHMMSS(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const result = (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  return result;
}

function Display({ time, timeStamps }) {
  return (
    <div className="display">
      <div>{millToHHMMSS(time)}</div>
      {timeStamps.map((el) => (
        <li style={{ listStyleType: "none" }} key={el}>{el}</li>
      ))}
    </div>
  );
}

function StopWatch() {
  // constants defines
  const displayStatus = ["Start", "Stop", "Continue"];
  const STOPWATCH_IS_ZERO = 0;
  const STOPWATCH_IS_RUNNING = 1;
  const STOPWATCH_IS_PAUSED = 2;
  //state hooks
  const [time, setTime] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [status, setStatus] = useState(STOPWATCH_IS_ZERO); // 0 - not running, 1 - running, 2 - paused
  const [timeStamps, setTimeStamps] = useState([]);
  // effect hook
  useEffect(() => {
    let interval = undefined;
    if (status === STOPWATCH_IS_RUNNING && visibility) {
      console.log("inside useEffect, status set to Running");
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [status, visibility]);
  // handlers
  const clickHandler = () => {
    setTime(0);
    setStatus(STOPWATCH_IS_ZERO);
    setTimeStamps([]);
    setVisibility(!visibility);
  };
  const resetClickHandler = () => {
    setStatus(STOPWATCH_IS_ZERO);
    setTimeStamps([]);
    setTime(0);
  };
  const startClickHandler = (status) => () => {
    switch (status) {
      case STOPWATCH_IS_ZERO:
        setStatus(STOPWATCH_IS_RUNNING);
        console.log("set to running", status);
        break;
      case STOPWATCH_IS_RUNNING:
        setStatus(STOPWATCH_IS_PAUSED);
        console.log("set to paused", status);
        break;
      case STOPWATCH_IS_PAUSED:
        setStatus(STOPWATCH_IS_RUNNING);
        console.log("set to running", status);
        break;
      default:
        break;
    }
  };
  const addClickHandler = () => {
    if (timeStamps.length < 5) {
      setTimeStamps([...timeStamps, millToHHMMSS(time)]);
    } else if (timeStamps.length < 10) {
      const str = (timeStamps.length % 2 === 0) ? "Куда?" : "Зачем?";
      setTimeStamps([...timeStamps, str]);
    }
  };

  return (
    <>
      <button onClick={clickHandler}>
        {visibility ? "Hide StopWatch" : "Show StopWatch"}
      </button>
      {visibility && (
        <div>
          <button onClick={startClickHandler(status)}>
            {displayStatus[status]}
          </button>
          {status !== STOPWATCH_IS_ZERO && (
            <button onClick={addClickHandler}>Add</button>
          )}
          <button onClick={resetClickHandler}>
            Reset
          </button>
          <Display time={time} timeStamps={timeStamps} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <StopWatch />
    </>
  );
}

export default App;
