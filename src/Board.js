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
import ShotEnemy from "./ShotEnemy";
import ShotedShips from "./ShotedShips";

export default function Board1({
  letters,
  nums,
  player,
  shipsData1,
  setShipsData1,
  shipsData2,
  setShipsData2,
  whoseTurn,
  setWhoseTurn,
  whoseReady,
  setWhoseReady,
}) {
  const { boardPlayer1, dispatchPlayer1 } = useUserContext();
  const [horOrVert, setHorOrVert] = useState(null);
  const [whichShip, setWhichShip] = useState(null);

  const customMessage = "Please select the beginning of the ship";

  const [message, setMessage] = useState(customMessage);
  const [isShot, setIsShot] = useState(false);

  let whichPlayer;
  let enemyPlayer;
  let enemyPlayerIndex;
  if (player === 1) {
    whichPlayer = "player1";
    enemyPlayer = "player2";
    enemyPlayerIndex = 2;
  } else {
    whichPlayer = "player2";
    enemyPlayer = "player1";
    enemyPlayerIndex = 1;
  }

  function putShip(horInd, vertIndex) {
    switch (horOrVert) {
      case "hor": {
        if (vertIndex + whichShip > 10) {
          setMessage("Can't put this ship here");
        } else if (boardPlayer1[whichPlayer][horInd][vertIndex].isShipAllowed) {
          let check = 0;
          let checkWhichShip = whichShip;
          let checkIndex = vertIndex;

          while (checkWhichShip) {
            if (!boardPlayer1[whichPlayer][horInd][checkIndex].isShipAllowed) {
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
              player: whichPlayer,
            });

            setMessage(customMessage);
            setWhichShip(null);
            setHorOrVert(null);
            if (player === 1) {
              setShipsData1({
                ...shipsData1,
                [whichPlayer + horInd + vertIndex]: whichShip,
              });
            } else {
              setShipsData2({
                ...shipsData2,
                [whichPlayer + horInd + vertIndex]: whichShip,
              });
            }
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
        } else if (boardPlayer1[whichPlayer][horInd][vertIndex].isShipAllowed) {
          let check = 0;
          let checkHorInd = horInd;
          let checkWhichShip = whichShip;

          while (checkWhichShip) {
            if (
              !boardPlayer1[whichPlayer][checkHorInd][vertIndex].isShipAllowed
            ) {
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
              player: whichPlayer,
            });
            setMessage(customMessage);
            setWhichShip(null);
            setHorOrVert(null);
            if (player === 1) {
              setShipsData1({
                ...shipsData1,
                [whichPlayer + horInd + vertIndex]: whichShip,
              });
            } else {
              setShipsData2({
                ...shipsData2,
                [whichPlayer + horInd + vertIndex]: whichShip,
              });
            }
          } else {
            setMessage("Can't put this ship here");
          }
        } else {
          setMessage("Can't put this ship here");
        }

        break;
      }
    }
  }

  function fire(horInd, vertIndex) {
    if (whoseTurn === player) {
      dispatchPlayer1({
        type: ACTION_TYPES.IS_SHOT,
        horInd: horInd,
        vertIndex: vertIndex,
        player: enemyPlayer,
      });
      setMessage(customMessage);
      setIsShot(true);

      if (boardPlayer1[enemyPlayer][horInd][vertIndex].isShip) {
        if (player === 1) {
          setShipsData2({
            ...shipsData2,
            [boardPlayer1[enemyPlayer][horInd][vertIndex].shipId]:
              shipsData2[boardPlayer1[enemyPlayer][horInd][vertIndex].shipId] -
              1,
          });
        } else {
          setShipsData1({
            ...shipsData1,
            [boardPlayer1[enemyPlayer][horInd][vertIndex].shipId]:
              shipsData1[boardPlayer1[enemyPlayer][horInd][vertIndex].shipId] -
              1,
          });
        }
      }
    }
  }

  return (
    <div className="boards-full">
      <UserLogo
        whoseTurn={whoseTurn}
        setWhoseTurn={setWhoseTurn}
        player={player}
        isShot={isShot}
        setIsShot={setIsShot}
      />
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
              {boardPlayer1[whichPlayer].map((hor, horInd) => {
                return hor.map((vert, vertIndex) => {
                  return (
                    <>
                      <div
                        className="one-board"
                        id={player + vert.id}
                        onClick={() => {
                          putShip(horInd, vertIndex);
                        }}
                      >
                        {boardPlayer1[whichPlayer][horInd][vertIndex]
                          .isShot && (
                          <Shot
                            horInd={horInd}
                            vertIndex={vertIndex}
                            player={player}
                            whichPlayer={whichPlayer}
                          />
                        )}
                        {boardPlayer1[whichPlayer][horInd][vertIndex]
                          .isShipBeginning && (
                          <Ship
                            horInd={horInd}
                            vertIndex={vertIndex}
                            horOrVert={horOrVert}
                            whichShip={whichShip}
                            setWhichShip={setWhichShip}
                            setHorOrVert={setHorOrVert}
                            player={player}
                            whichPlayer={whichPlayer}
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
          whoseReady={whoseReady}
          setWhoseReady={setWhoseReady}
          player={player}
        />
      </div>

      {/* second board */}

      {whoseTurn && (
        <div className="player-board">
          <div className="flex">
            <div className="letters">
              {letters.map((it, ind) => {
                return <div key={ind}>{it}</div>;
              })}
            </div>

            <div className="full-board">
              {boardPlayer1[enemyPlayer].map((hor, horInd) => {
                return hor.map((vert, vertIndex) => {
                  return (
                    <>
                      <div
                        className="one-board"
                        id={enemyPlayerIndex + vert.id + "enemy"}
                        onClick={() => {
                          fire(horInd, vertIndex);
                        }}
                      >
                        {boardPlayer1[enemyPlayer][horInd][vertIndex]
                          .isShot && (
                          <ShotEnemy
                            horInd={horInd}
                            vertIndex={vertIndex}
                            player={enemyPlayerIndex}
                            whichPlayer={enemyPlayer}
                          />
                        )}
                        {player === 1 &&
                          shipsData2[
                            boardPlayer1[enemyPlayer][horInd][vertIndex].shipId
                          ] === 0 && (
                            <ShotedShips
                              player={enemyPlayerIndex}
                              horInd={horInd}
                              vertIndex={vertIndex}
                              whichPlayer={enemyPlayer}
                              vert={vert}
                            />
                          )}
                        {player === 2 &&
                          shipsData1[
                            boardPlayer1[enemyPlayer][horInd][vertIndex].shipId
                          ] === 0 && (
                            <ShotedShips
                              player={enemyPlayerIndex}
                              horInd={horInd}
                              vertIndex={vertIndex}
                              whichPlayer={enemyPlayer}
                              vert={vert}
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
      )}
    </div>
  );
}
