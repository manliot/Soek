import { useContext } from "react";
import styles from './ConfigSidebar.module.css'
import { SidebarContext } from "@/context/sidebar/sideBarContext";
import { Option } from "./ConfigSidebar.interface";


export default function ConfigSidebar() {
  const { activeOption, setActiveOption, OPTIONS } = useContext(SidebarContext)

  const handleOptionClick = async (option: Option) => {
    setActiveOption(option);
  };

  return (
    <aside className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Configuración</h2>
      </div>
      <div className={styles.optionsContainer}>
        <ul
          className={styles.listUl}
        >
          {OPTIONS.map((option) => {
            return (
              <li
                key={option.option}
                className={`${option === activeOption ? styles.active : ''}`}
              >
                {option.icon}
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`${styles.btn}`}
                >{option.option}</button>
              </li>
            )
          })
          }
        </ul>
      </div>
    </aside>
  )
}
