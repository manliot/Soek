import { ChangeEvent } from 'react'
import { useProductContext } from "@/context/products/productContext";
import styles from "./SearchBar.module.css";
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { useNavigation } from '@/hooks/useNavigation';

export function SearchBar() {
    const { datafilter, updateFilterState } = useProductContext();
    const { navigateTo } = useNavigation();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name: string = event.target.value
        updateFilterState({ ...datafilter, nameFilter: name });
    };
    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="¿Que estas buscando?"
                value={datafilter.nameFilter}
                onChange={handleChange}
            ></input>
            <button className={styles.searchBtn}
                onClick={() => navigateTo('/home')}>
                <span><SearchIcon width={20} height={20} fill={'#FFFFFF'} /></span>
            </button>
        </div>
    )
}
