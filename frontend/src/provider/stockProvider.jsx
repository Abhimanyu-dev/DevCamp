import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import StockContext from "./stockContext";


// eslint-disable-next-line react/prop-types
export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState(null)
    const socket = io("ws://localhost:5000")

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected")
        })

        socket.on("stockUpdate", (data) => {
            setStocks(data)
        })
    }, [])

    return (
        <StockContext.Provider value={{ stocks }}>
            {children}
        </StockContext.Provider>
    )
}
