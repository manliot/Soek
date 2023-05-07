import Link from "next/link";
import styles from "./Header.module.css";
import { SearchBar } from "../searchBar";
import { InterfaceIcon } from "../InterfaceIcon";
import Image from "next/image";
import { useState } from "react";
import { MenuIcon } from "@/assets/svg/MenuIcon";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { useShoppingBagContext } from "@/context/shoppingBag/shoppingBagContex";

export function Header() {
  const [showMenu, setshowMenu] = useState(false)
  const { getTotals } = useShoppingBagContext()
  const { totalItems } = getTotals()
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <button
          onClick={() => setshowMenu(!showMenu)}
          className={`${styles.btnMobile} ${styles.btnMenu}`}
        >
          <MenuIcon fill="white" />
        </button>
        <Link
          href='/home'
          className={styles.logo}>
          <Image
            src={require('../../assets/png/logo-SOEK.png')}
            alt="Landscape picture"
            width={123}
          />
        </Link>
        <div className={styles.SearchBarContainer}>
          <SearchBar />
        </div>
        <nav className={`${styles.interfaceIconContainer} ${showMenu ? '' : styles.hide}`}>
          <Link href='/config'>
            <InterfaceIcon type="settings" />
          </Link>
          <Link href='/login'>
            <InterfaceIcon type="user" />
          </Link>
          <Link href='/shopping-bag'>
            <InterfaceIcon type="bag" notificationNumber={totalItems} />
          </Link>
          <button
            className={`${styles.btnMobile} ${styles.btnCloseMenu}`}
            onClick={() => setshowMenu(!showMenu)}
          >
            <CloseIcon fill="white" />
          </button>
        </nav>
      </div>
      <span
        onClick={() => setshowMenu(!showMenu)}
        className={`${styles.overlay} ${showMenu ? '' : styles.hide}`}
      ></span>
    </header>

  )
}
