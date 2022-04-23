import logo from "./logo.svg";
import "./App.css";
import { createContext, useEffect, useReducer, useState } from "react";
import Board1 from "./Board";
import GameStatus from "./GameStatus";

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
      shotShipLength: null,
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
      shotShipLength: null,
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
      let newBoard = board[action.player].map((hor, horind) => {
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
      return { ...board, [action.player]: newBoard };
    }
    case ACTION_TYPES.IS_SHIP_HOR: {
      let index = action.whichShip + action.vertIndex - 1;
      let myHorInd = action.horInd + 1;

      let newBoard = board[action.player].map((hor, horind) => {
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
                shotShipLength: action.whichShip,
                shipId: action.player + horind + action.vertIndex,
              };
            } else if (breakingPoint) {
              breakingPoint--;

              return {
                ...vert,
                isShip: true,
                shipLength: action.whichShip,
                isShipAllowed: false,
                shotShipLength: action.whichShip,
                shipId: action.player + horind + action.vertIndex,
                horOrVert: action.horOrVert,
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
      return { ...board, [action.player]: newBoard };
    }
    case ACTION_TYPES.IS_SHIP_VERT: {
      let breakingPoint = null;
      let index = action.vertIndex + 1;

      let newBoard = board[action.player].map((hor, horind) => {
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
                shotShipLength: action.whichShip,
                shipId: action.player + action.horInd + action.vertIndex,
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
                shotShipLength: action.whichShip,
                shipId: action.player + action.horInd + action.vertIndex,
                horOrVert: action.horOrVert,
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
      return { ...board, [action.player]: newBoard };
    }
  }
}

function App() {
  const [boardPlayer1, dispatchPlayer1] = useReducer(
    boardHandler,
    defaultState
  );
  const [shipsData1, setShipsData1] = useState({});
  const [shipsData2, setShipsData2] = useState({});
  const [whoseTurn, setWhoseTurn] = useState(null);
  const [whoseReady, setWhoseReady] = useState({ count: 0, whichPlayer: null });
  const [winner, setWinner] = useState(null);
  const player1 = 1;
  const player2 = 2;

  useEffect(() => {
    if (whoseReady.count === 2) {
      setWhoseTurn(1);
    }
  }, [whoseReady]);

  useEffect(() => {
    if (whoseTurn) {
      if (player1) {
        let length = Object.keys(shipsData1).length;
        for (const key in shipsData1) {
          if (shipsData1[key] === 0) {
            length--;
          }
        }
        if (length === 0) {
          setWinner("The Winner is Player2");
        }
      }

      if (player2) {
        let length = Object.keys(shipsData2).length;
        for (const key in shipsData2) {
          if (shipsData2[key] === 0) {
            length--;
          }
        }
        if (length === 0) {
          setWinner("The winner is Player 1");
        }
      }
    }
  }, [shipsData1, shipsData2]);

  return (
    <State.Provider value={{ boardPlayer1, dispatchPlayer1 }}>
      {(!winner && (
        <>
          {!whoseTurn && (
            <GameStatus whoseReady={whoseReady} setWhoseReady={setWhoseReady} />
          )}
          <Board1
            letters={letters}
            nums={nums}
            player={player1}
            shipsData1={shipsData1}
            setShipsData1={setShipsData1}
            shipsData2={shipsData2}
            setShipsData2={setShipsData2}
            whoseTurn={whoseTurn}
            setWhoseTurn={setWhoseTurn}
            whoseReady={whoseReady}
            setWhoseReady={setWhoseReady}
          />
          <Board1
            letters={letters}
            nums={nums}
            player={player2}
            shipsData1={shipsData1}
            setShipsData1={setShipsData1}
            shipsData2={shipsData2}
            setShipsData2={setShipsData2}
            whoseTurn={whoseTurn}
            setWhoseTurn={setWhoseTurn}
            whoseReady={whoseReady}
            setWhoseReady={setWhoseReady}
          />
        </>
      )) || <div className="winner">{winner}</div>}
    </State.Provider>
  );
}

export default App;
