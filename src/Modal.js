import React, { useRef } from "react";
import useClickOutside from "./hooks/useClickOutside";
import bigShipHor from "./assets/photo/ship-big.png";
import bigShipVert from "./assets/photo/ship-big-vert.png";
import smallShipHor from "./assets/photo/ship-small.png";
import smallShipVert from "./assets/photo/ship-small-vert.png";

export default function Modal({
  setShipSelected,
  whichShip,
  isShipSelected,
  ref,
  setHorOrVert,
}) {
  let hor;
  let vert;

  switch (whichShip) {
    case 4: {
      hor = bigShipHor;
      vert = bigShipVert;
      break;
    }
    case 3: {
      hor = bigShipHor;
      vert = bigShipVert;
      break;
    }
    case 2: {
      hor = smallShipHor;
      vert = smallShipVert;
      break;
    }
    case 1: {
      return (
        <div>
          <button onClick={horHandler}>
            <img src={smallShipHor} width="50px" height="50px" />
          </button>
        </div>
      );
    }
  }

  function horHandler() {
    setHorOrVert("hor");
    setShipSelected(false);
  }
  function vertHandler() {
    setHorOrVert("vert");
    setShipSelected(false);
  }

  return (
    <div>
      <button onClick={horHandler}>
        <img src={hor} width="100px" height="50px" />
      </button>
      <button onClick={vertHandler}>
        <img src={vert} width="50px" height="100px" />
      </button>
    </div>
  );
}

// if (vertIndex === action.vertIndex - 1 ||
//   vertIndex === action.vertIndex + 1 ||) {
//   return {
//     ...vert,
//     isShipAllowed: false,
//   };
// } else {
//   return vert;
// }
// });
// return newHor;
// })
// } else {
// return hor;
// }
