import React from "react";
import { createPortal } from "react-dom";
import { useUserContext } from "./hooks/UserContext";
import miss from "./assets/photo/fire-just-earth.png";
import boom from "./assets/photo/fire-realistic.webp";

export default function ShotEnemy({ horInd, vertIndex, player, whichPlayer }) {
  const { boardPlayer1, dispatchPlayer1 } = useUserContext();

  if (boardPlayer1[whichPlayer][horInd][vertIndex].isShip) {
    return createPortal(
      <div className="shooting">
        <img src={boom} width="50px" height="50px" />
      </div>,
      document.getElementById(
        player + boardPlayer1[whichPlayer][horInd][vertIndex].id + "enemy"
      )
    );
  }

  return createPortal(
    <div className="shooting">
      <img src={miss} width="50px" height="50px" />
    </div>,
    document.getElementById(
      player + boardPlayer1[whichPlayer][horInd][vertIndex].id + "enemy"
    )
  );
}
