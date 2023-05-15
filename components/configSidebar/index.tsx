import { useContext, useState } from "react";
import styles from './ConfigSidebar.module.css'
import { SidebarContext } from "@/context/sidebar/sideBarContext";
import { Option } from "./ConfigSidebar.interface";


export function ConfigSidebar() {
  const { activeOption, setActiveOption, OPTIONS } = useContext(SidebarContext)
  const [showOptions, setshowOptions] = useState(false)

  const handleOptionClick = async (option: Option) => {
    setActiveOption(option);
  };

  return (
    <aside className={styles.container}>
      <div
        className={`${styles.titleContainer} ${showOptions ? styles.fixed : ''}`}
        onClick={() => setshowOptions(!showOptions)}
      >
        <h2>Configuración</h2>
      </div>
      <div className={`
      ${styles.optionsContainer} 
      ${showOptions ? styles.fixed : ''}
      ${showOptions ? styles.show : ''}
      `}>
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
      <div
        className={`${styles.overlay} ${showOptions ? styles.show : ''}`}
        onClick={() => setshowOptions(!showOptions)}></div>
    </aside>
  )
}
