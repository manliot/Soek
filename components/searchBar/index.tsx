import styles from "./SearchBar.module.css";
import { SearchIcon } from "../../assets/svg/SearchIcon";

export function SearchBar() {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="¿Que estas buscando?"></input>
            <button className={styles.searchBtn}>
                <span><SearchIcon width={20} height={20} fill={'#FFFFFF'} /></span>
            </button>
        </div>
    )
}
