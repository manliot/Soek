
import Header from "@/components/header";
import ConfigSidebar from "@/components/configSidebar";
import ConfigContent from "@/components/configContent";
import { SideBarContextProvider, SidebarContext } from "@/context/sidebar/sideBarContext";

export default function Config() {

  return (
    <SideBarContextProvider>
      <Header />
      <ConfigSidebar />
      <ConfigContent />

    </SideBarContextProvider>
  )
}
