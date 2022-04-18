import React, { createContext, useEffect, useReducer, useState } from "react";
import bigShip from "./assets/photo/ship-big.png";
import boom from "./assets/photo/fire-realistic.webp";
import miss from "./assets/photo/fire-just-earth.png";
import { createPortal } from "react-dom";
import Shot from "./Shot";
import Ship from "./Ship";
import { useUserContext } from "./hooks/UserContext";
import { ACTION_TYPES } from "./App";
import AddShips from "./AddShips";
import UserLogo from "./UserLogo";

export default function Board1({ letters, nums }) {
  const { boardPlayer1, dispatchPlayer1 } = useUserContext();
  const [horOrVert, setHorOrVert] = useState(null);
  const [whichShip, setWhichShip] = useState(null);

  const customMessage = "Please select the beginning of the ship";

  const [message, setMessage] = useState(customMessage);

  function fire(horInd, vertIndex) {
    if (whichShip) {
      switch (horOrVert) {
        case "hor": {
          if (vertIndex + whichShip > 10) {
            setMessage("Can't put this ship here");
          } else if (boardPlayer1.player1[horInd][vertIndex].isShipAllowed) {
            let check = 0;
            let checkWhichShip = whichShip;
            let checkIndex = vertIndex;

            while (checkWhichShip) {
              if (!boardPlayer1.player1[horInd][checkIndex].isShipAllowed) {
                check++;
              }
              checkWhichShip--;
              checkIndex++;
            }

            if (check === 0) {
              dispatchPlayer1({
                type: ACTION_TYPES.IS_SHIP_HOR,
                horInd: horInd,
                vertIndex: vertIndex,
                whichShip: whichShip,
                horOrVert: horOrVert,
              });
              setMessage(customMessage);
              setWhichShip(null);
              setHorOrVert(null);
            } else {
              setMessage("Can't put this ship here");
            }
          } else {
            setMessage("Can't put this ship here");
          }

          break;
        }
        case "vert": {
          if (horInd + whichShip > 10) {
            setMessage("Can't put this ship here");
          } else if (boardPlayer1.player1[horInd][vertIndex].isShipAllowed) {
            let check = 0;
            let checkHorInd = horInd;
            let checkWhichShip = whichShip;

            while (checkWhichShip) {
              if (!boardPlayer1.player1[checkHorInd][vertIndex].isShipAllowed) {
                check++;
              }
              checkWhichShip--;
              checkHorInd++;
            }

            if (check === 0) {
              dispatchPlayer1({
                type: ACTION_TYPES.IS_SHIP_VERT,
                horInd: horInd,
                vertIndex: vertIndex,
                whichShip: whichShip,
                horOrVert: horOrVert,
              });
              setMessage(customMessage);
              setWhichShip(null);
              setHorOrVert(null);
            } else {
              setMessage("Can't put this ship here");
            }
          } else {
            setMessage("Can't put this ship here");
          }

          break;
        }
      }
    } else {
      dispatchPlayer1({
        type: ACTION_TYPES.IS_SHOT,
        horInd: horInd,
        vertIndex: vertIndex,
      });
      setMessage(customMessage);
    }
  }

  return (
    <>
      <div className="player-1">
        <div className="player-board">
          {horOrVert && <div>{message}</div>}
          <div className="flex">
            <div className="letters">
              {letters.map((it, ind) => {
                return <div key={ind}>{it}</div>;
              })}
            </div>

            <div className="full-board">
              {boardPlayer1.player1.map((hor, horInd) => {
                return hor.map((vert, vertIndex) => {
                  return (
                    <>
                      <div
                        className="one-board"
                        id={vert.id}
                        onClick={() => {
                          fire(horInd, vertIndex);
                        }}
                      >
                        {boardPlayer1.player1[horInd][vertIndex].isShot && (
                          <Shot horInd={horInd} vertIndex={vertIndex} />
                        )}
                        {boardPlayer1.player1[horInd][vertIndex]
                          .isShipBeginning && (
                          <Ship
                            horInd={horInd}
                            vertIndex={vertIndex}
                            horOrVert={horOrVert}
                            whichShip={whichShip}
                            setWhichShip={setWhichShip}
                            setHorOrVert={setHorOrVert}
                          />
                        )}
                      </div>

                      {vertIndex === 9 && <br />}
                    </>
                  );
                });
              })}
            </div>
          </div>
          <div className="numbers">
            {nums.map((it, ind) => {
              return <div key={ind}>{it}</div>;
            })}
          </div>
        </div>
        <AddShips
          setHorOrVert={setHorOrVert}
          whichShip={whichShip}
          setWhichShip={setWhichShip}
        />
      </div>
      <UserLogo />
    </>
  );
}
