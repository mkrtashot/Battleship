import React, { useCallback, useMemo } from "react";
import { useUserContext } from "./hooks/UserContext";
import bigShip from "./assets/photo/ship-big.png";
import bigShipVert from "./assets/photo/ship-big-vert.png";
import smallShip from "./assets/photo/ship-small.png";
import smallShipVert from "./assets/photo/ship-small-vert.png";
import { createPortal } from "react-dom";

export default function Ship({
  horInd,
  vertIndex,
  horOrVert,
  whichShip,
  setWhichShip,
  setHorOrVert,
}) {
  const { boardPlayer1, dispatchPlayer1 } = useUserContext();

  function myCallBack() {
    let src;
    let shipLength = boardPlayer1.player1[horInd][vertIndex].shipLength;
    let thisHorOrVert = boardPlayer1.player1[horInd][vertIndex].horOrVert;
    console.dir(boardPlayer1.player1[horInd][vertIndex]);
    if (boardPlayer1.player1[horInd][vertIndex].horOrVert === "hor") {
      switch (boardPlayer1.player1[horInd][vertIndex].shipLength) {
        case 4: {
          src = bigShip;
          break;
        }
        case 3: {
          src = bigShip;
          break;
        }
        case 2: {
          src = smallShip;
          break;
        }
        case 1: {
          src = smallShip;
          break;
        }
      }
    } else {
      switch (boardPlayer1.player1[horInd][vertIndex].shipLength) {
        case 4: {
          src = bigShipVert;
          console.log("Log ::: src :::", src);
          break;
        }
        case 3: {
          src = bigShipVert;
          break;
        }
        case 2: {
          src = smallShipVert;
          break;
        }
        case 1: {
          src = smallShipVert;
          break;
        }
      }
    }

    let myWidth;
    let myHeight;
    if (thisHorOrVert === "hor") {
      myWidth = shipLength * 50 + "px";
      myHeight = "50px";
    } else {
      myWidth = "50px";
      myHeight = shipLength * 50 + "px";
    }
    return createPortal(
      <img src={src} width={myWidth} height={myHeight} />,
      document.getElementById(boardPlayer1.player1[horInd][vertIndex].id)
    );
    // setHorOrVert(null);
    // setWhichShip(null);
  }

  const memorizedCallback = useMemo(() => {
    myCallBack();
  }, [horInd]);

  return myCallBack();
}
