import style from "../css/navbar.module.css"
import { IoIosSearch } from "react-icons/io"
import { CiBellOn } from "react-icons/ci"
import { FaRegUserCircle } from "react-icons/fa";



const Navbar = () => {
    return (
        <>
            <div className={style.container}>
                <div className={style.title}>
                    Stock Map
                </div>
                <div className={style.search}>
                    <div className={style.searchBar}>
                        <IoIosSearch />
                        <input type="text" placeholder="Search" />
                    </div>
                    <CiBellOn size={20} className={style.bell} />
                </div>
                <div className={style.profile}>
                    <div>Abhimanyu Solanki</div>
                    <FaRegUserCircle size={20} />
                </div>
            </div>
        </>
    )
}

export default Navbar