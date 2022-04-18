import React, { useRef, useState } from "react";
import bigShip from "./assets/photo/ship-big.png";
import smallShip from "./assets/photo/ship-small.png";
import useClickOutside from "./hooks/useClickOutside";
import Modal from "./Modal";

export default function AddShips({ setHorOrVert, whichShip, setWhichShip }) {
  const [isShipSelected, setShipSelected] = useState(false);

  const ship4Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(4);
  };
  const ship3Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(3);
  };
  const ship2Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(2);
  };
  const ship1Handler = () => {
    setShipSelected(!isShipSelected);
    setWhichShip(1);
  };

  return (
    <div>
      <div>Please Choose Your Tactic</div>
      <ul>
        <li onClick={ship4Handler}>
          <img src={bigShip} width="200px" height="50px" /> <span>X1</span>
        </li>
        <li onClick={ship3Handler}>
          <img src={bigShip} width="150px" height="50px" /> <span>X2</span>
        </li>
        <li onClick={ship2Handler}>
          <img src={smallShip} width="100px" height="50px" /> <span>X3</span>
        </li>
        <li onClick={ship1Handler}>
          <img src={smallShip} width="50px" height="50px" /> <span>X4</span>
        </li>
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
