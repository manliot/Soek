import Link from "next/link";
import styles from "./Header.module.css";
import SearchBar from "../searchBar";
import InterfaceIcon from "../InterfaceIcon";
import Image from "next/image";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link
          href='/home'>
          <Image
            src={require('../../assets/png/logo-SOEK.png')}
            alt="Landscape picture"
            width={123}
          />
        </Link>
        <div className={styles.SearchBarContainer}>
          <SearchBar />
        </div>
        <nav className={styles.interfaceIconContainer}>
          <Link href='/config'>
            <InterfaceIcon type="settings" />
          </Link>
          <Link href='/login'>
            <InterfaceIcon type="user" />
          </Link>
          <Link href='/shopping-bag'>
            <InterfaceIcon type="bag" notificationNumber={12} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
