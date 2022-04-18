import React, { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import userPhoto from "./assets/photo/user-logo.webp";
let timerInterval;

export default function UserLogo() {
  const [timer, setTimer] = useState(0);

  function timerHandler() {
    timerInterval = setInterval(() => {
      setTimer((prev) => prev + 5);
    }, 1000);
  }

  if (timer >= 100) {
    clearInterval(timerInterval);
    setTimer(0);
  }

  return (
    <div className="user-logo">
      <CircularProgressbarWithChildren value={timer}>
        <img src={userPhoto} style={{ width: 100, height: 100 }} />
      </CircularProgressbarWithChildren>

      <button onClick={timerHandler}>Start timer</button>
    </div>
  );
}
