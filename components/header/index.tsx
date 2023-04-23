import styles from "./Header.module.css";
import SearchBar from "../searchBar";
import InterfaceIcon from "../InterfaceIcon";
import Image from "next/image";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Image
          src={require('../../assets/png/logo-SOEK.png')}
          alt="Landscape picture"
          width={123}
        />
        <div className={styles.SearchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.interfaceIconContainer}>
          <InterfaceIcon type="settings" />
          <InterfaceIcon type="user" />
          <InterfaceIcon type="bag" notificationNumber={12} />

        </div>
      </div>
    </header>
  )
}
