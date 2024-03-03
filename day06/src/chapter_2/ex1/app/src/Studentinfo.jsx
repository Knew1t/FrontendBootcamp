import { useState } from "react";
import "./App.css";

function calcAge(birthday) {
  const today = new Date();
  let diff = today.getFullYear() - birthday.getFullYear();
  if (
    birthday.getMonth() > today.getMonth() ||
    (birthday.getMonth() === today.getMonth() &&
      birthday.getDay() > today.getDay())
  ) {
    --diff;
  }
  return `Age: ${diff}`;
}

function StudentInfo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <div class="info Container">
          <img src="/oldpass.jpg" alt="aboba man" />
          <h4>Александр Александрович Саенко</h4>
          <h4>{calcAge(new Date(1992, 3, 4))}</h4>
        </div>
      )}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide information" : "Show information"}
      </button>
      <br />
    </>
  );
}

export default StudentInfo;
