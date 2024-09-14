import { useContext } from "react";
import StockContext from "./stockContext";

const useStock = () => useContext(StockContext)

export default useStock