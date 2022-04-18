import React, { useRef, useState } from "react";
import bigShip from "./assets/photo/ship-big.png";
import smallShip from "./assets/photo/ship-small.png";
import useClickOutside from "./hooks/useClickOutside";
import Modal from "./Modal";

export default function AddShips({ setHorOrVert, whichShip, setWhichShip }) {
  const [isShipSelected, setShipSelected] = useState(false);
  const [ship4, setShip4] = useState(1);
  const [ship3, setShip3] = useState(2);
  const [ship2, setShip2] = useState(3);
  const [ship1, setShip1] = useState(4);

  const ship4Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(4);
    setShip4((prev) => prev - 1);
  };
  const ship3Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(3);
    setShip3((prev) => prev - 1);
  };
  const ship2Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(2);
    setShip2((prev) => prev - 1);
  };
  const ship1Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(1);
    setShip1((prev) => prev - 1);
  };

  return (
    <div>
      <div>Please Choose Your Tactic</div>
      <ul>
        {!!ship4 && (
          <li onClick={ship4Handler}>
            <img src={bigShip} width="200px" height="50px" />
            <span>X{ship4}</span>
          </li>
        )}
        {!!ship3 && (
          <li onClick={ship3Handler}>
            <img src={bigShip} width="150px" height="50px" />
            <span>X{ship3}</span>
          </li>
        )}
        {!!ship2 && (
          <li onClick={ship2Handler}>
            <img src={smallShip} width="100px" height="50px" />
            <span>X{ship2}</span>
          </li>
        )}
        {!!ship1 && (
          <li onClick={ship1Handler}>
            <img src={smallShip} width="50px" height="50px" />
            <span>X{ship1}</span>
          </li>
        )}
      </ul>
      {isShipSelected && (
        <Modal
          setShipSelected={setShipSelected}
          whichShip={whichShip}
          isShipSelected={isShipSelected}
          setHorOrVert={setHorOrVert}
        />
      )}
    </div>
  );
}
