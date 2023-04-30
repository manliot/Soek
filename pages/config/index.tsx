import styles from "@/styles/config/Config.module.css";
import { Header } from "@/components/header";
import { ConfigSidebar } from "@/components/configSidebar";
import { ConfigContent } from "@/components/configContent";
import { SideBarContextProvider, SidebarContext } from "@/context/sidebar/sideBarContext";

export default function Config() {

  return (
    <SideBarContextProvider>
      <Header />
      <main className={styles.main}>
        <ConfigSidebar />
        <div className={styles.contentContainer}>
          <ConfigContent />
        </div>
      </main>
    </SideBarContextProvider>
  )
}
