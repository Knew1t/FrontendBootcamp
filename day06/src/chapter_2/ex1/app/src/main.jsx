import React from "react";
import ReactDOM from "react-dom/client";
import Stopwatch from "./Stopwatch.jsx";
import StudentInfo from "./Studentinfo.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentInfo />
    <Stopwatch />
  </React.StrictMode>,
);
