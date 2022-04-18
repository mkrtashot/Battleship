import React from "react";
import { createPortal } from "react-dom";
import { useUserContext } from "./hooks/UserContext";
import miss from "./assets/photo/fire-just-earth.png";
import boom from "./assets/photo/fire-realistic.webp";

export default function Shot({ horInd, vertIndex }) {
  const { boardPlayer1, dispatchPlayer1 } = useUserContext();

  if (boardPlayer1.player1[horInd][vertIndex].isShip) {
    return createPortal(
      <div className="shooting">
        <img src={boom} width="50px" height="50px" />
      </div>,
      document.getElementById(boardPlayer1.player1[horInd][vertIndex].id)
    );
  }

  return createPortal(
    <div className="shooting">
      <img src={miss} width="50px" height="50px" />
    </div>,
    document.getElementById(boardPlayer1.player1[horInd][vertIndex].id)
  );
}
