import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import userPhoto from "./assets/photo/user-logo.webp";
let timerInterval;

export default function UserLogo({
  whoseTurn,
  setWhoseTurn,
  player,
  isShot,
  setIsShot,
}) {
  let showPlayer;

  if (player === 1) {
    showPlayer = "Player 1";
  } else if (player === 2) {
    showPlayer = "Player 2";
  }

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (whoseTurn === player) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 5);
      }, 1000);
    }
  }, [whoseTurn]);

  if (timer >= 100 || isShot) {
    clearInterval(timerInterval);
    setTimer(0);
    setWhoseTurn(3 - whoseTurn);
    setIsShot(false);
  }

  return (
    <div className="user-logo">
      <CircularProgressbarWithChildren value={timer}>
        <img src={userPhoto} style={{ width: 100, height: 100 }} />
      </CircularProgressbarWithChildren>
      <div>{showPlayer}</div>
    </div>
  );
}
