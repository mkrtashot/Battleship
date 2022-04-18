import logo from "./logo.svg";
import "./App.css";
import { createContext, useEffect, useReducer } from "react";
import Board1 from "./Board";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ACTION_TYPES = {
  IS_SHOT: "IS_SHOT",
  IS_SHIP_HOR: "IS_SHIP_HOR",
  IS_SHIP_VERT: "IS_SHIP_VERT",
};
let player1 = letters.map((letter, letterInd) => {
  return nums.map((num, numInd) => {
    return {
      id: letter + num,
      isShip: false,
      isShipBeginning: false,
      isShot: false,
      isShipAllowed: true,
      shipLength: null,
      horOrVert: null,
    };
  });
});

let player2 = letters.map((letter, letterInd) => {
  return nums.map((num, numInd) => {
    return {
      id: letter + num,
      isShip: false,
      isShipBeginning: false,
      isShot: false,
      isShipAllowed: true,
      shipLength: null,
      horOrVert: null,
    };
  });
});

let defaultState = {
  player1: player1,
  player2: player2,
};

export const State = createContext(defaultState);

function boardHandler(board, action) {
  switch (action.type) {
    case ACTION_TYPES.IS_SHOT: {
      let newBoard = board.player1.map((hor, horind) => {
        if (horind === action.horInd) {
          let newHor = hor.map((vert, vertIndex) => {
            if (vertIndex === action.vertIndex) {
              return { ...vert, isShot: true };
            } else {
              return vert;
            }
          });
          return newHor;
        } else {
          return hor;
        }
      });
      return { ...board, player1: newBoard };
    }
    case ACTION_TYPES.IS_SHIP_HOR: {
      let index = action.whichShip + action.vertIndex - 1;
      let myHorInd = action.horInd + 1;

      let newBoard = board.player1.map((hor, horind) => {
        let breakingPoint = null;
        if (horind === action.horInd) {
          let newHor = hor.map((vert, vertIndex) => {
            if (vertIndex === action.vertIndex) {
              breakingPoint = action.whichShip - 1;

              return {
                ...vert,
                isShip: true,
                isShipBeginning: true,
                shipLength: action.whichShip,
                horOrVert: action.horOrVert,
                isShipAllowed: false,
              };
            } else if (breakingPoint) {
              breakingPoint--;

              return {
                ...vert,
                isShip: true,
                shipLength: action.whichShip,
                isShipAllowed: false,
              };
            } else if (
              vertIndex === action.vertIndex - 1 ||
              vertIndex === index + 1
            ) {
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else {
              return vert;
            }
          });
          return newHor;
        } else if (
          horind === action.horInd - 1 ||
          horind === action.horInd + 1
        ) {
          let breakingPoint = null;

          let newHor = hor.map((vert, vertIndex) => {
            if (
              vertIndex === action.vertIndex - 1 ||
              vertIndex === action.vertIndex ||
              vertIndex === action.vertIndex
            ) {
              breakingPoint = action.whichShip;
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else if (breakingPoint) {
              breakingPoint--;
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else {
              return vert;
            }
          });
          return newHor;
        } else {
          return hor;
        }
      });
      return { ...board, player1: newBoard };
    }
    case ACTION_TYPES.IS_SHIP_VERT: {
      let breakingPoint = null;
      let index = action.vertIndex + 1;

      let newBoard = board.player1.map((hor, horind) => {
        if (horind === action.horInd) {
          let newHor = hor.map((vert, vertIndex) => {
            console.log("Log ::: action.vertIndex :::", action.vertIndex);
            if (vertIndex === action.vertIndex) {
              breakingPoint = action.whichShip - 1;
              return {
                ...vert,
                isShip: true,
                isShipBeginning: true,
                shipLength: action.whichShip,
                horOrVert: action.horOrVert,
                isShipAllowed: false,
              };
            } else if (
              vertIndex === action.vertIndex + 1 ||
              vertIndex === action.vertIndex - 1
            ) {
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else {
              return vert;
            }
          });
          return newHor;
        } else if (breakingPoint) {
          breakingPoint--;
          console.log("Log ::: index :::", index);

          let newHor = hor.map((vert, vertIndex) => {
            if (vertIndex === action.vertIndex) {
              return {
                ...vert,
                isShip: true,
                shipLength: action.whichShip,
                horOrVert: action.horOrVert,
                isShipAllowed: false,
              };
            } else if (
              vertIndex === action.vertIndex + 1 ||
              vertIndex === action.vertIndex - 1
            ) {
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else {
              return vert;
            }
          });
          // index++;
          return newHor;
        } else if (
          horind === action.horInd + action.whichShip ||
          horind === action.horInd - 1
        ) {
          let newHor = hor.map((vert, vertIndex) => {
            if (
              vertIndex === action.vertIndex - 1 ||
              vertIndex === action.vertIndex + 1 ||
              vertIndex === action.vertIndex
            ) {
              return {
                ...vert,
                isShipAllowed: false,
              };
            } else {
              return vert;
            }
          });
          return newHor;
        } else {
          return hor;
        }
      });
      return { ...board, player1: newBoard };
    }
  }
}

function App() {
  const [boardPlayer1, dispatchPlayer1] = useReducer(
    boardHandler,
    defaultState
  );

  useEffect(() => {
    console.log("Log ::: boardPlayer1 :::", boardPlayer1);
  }, [boardPlayer1]);

  return (
    <State.Provider value={{ boardPlayer1, dispatchPlayer1 }}>
      <Board1 letters={letters} nums={nums} />
    </State.Provider>
  );
}

export default App;
