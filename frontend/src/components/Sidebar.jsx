import style from "../css/sidebar.module.css"
import useStock from "../provider/useStock"

const Sidebar = () => {
    const { stocks } = useStock()
    return (
        <>
            <div className={style.container}>
                {
                    stocks != null ? stocks.sort((a, b) => a.ticker.localeCompare(b.ticker)).map((stock) => {
                        return (
                            <div key={stock._id} className={style.stock}>
                                {stock.ticker}
                            </div>
                        )
                    }) : <></>
                }
            </div>
        </>
    )
}

export default Sidebar