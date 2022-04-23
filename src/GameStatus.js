import React, { useState } from "react";

export default function GameStatus({ whoseReady, setWhoseReady }) {
  return (
    (whoseReady.whichPlayer === 1 && "Waiting for Player 2") ||
    (whoseReady.whichPlayer === 2 && "Waiting for Player 1") ||
    "Please choose your tactic and press READY button"
  );
}
