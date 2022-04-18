import { useContext } from "react";
import { State } from "../App";

export const useUserContext = () => useContext(State);
