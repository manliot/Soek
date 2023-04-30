import { createContext, useState, ReactNode } from "react";
import { Option } from "@/components/configSidebar/ConfigSidebar.interface";
import AddIcon from "@/assets/svg/AddIcon";
import UpdateIcon from "@/assets/svg/UpdateIcon";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { SidebarContextType } from "./sideBarContext.interface";


const OPTIONS: Option[] = [
  {
    option: 'Ingresar Producto',
    icon: <AddIcon />
  },
  {
    option: 'Actualizar Producto',
    icon: <UpdateIcon />
  },
  {
    option: 'Eliminar Producto',
    icon: <DeleteIcon />
  }
];

const defaultValues: SidebarContextType = {
  activeOption: OPTIONS[0],
  setActiveOption: () => { },
  OPTIONS: [],
};


export const SidebarContext = createContext(defaultValues)

export const SideBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeOption, setActiveOption] = useState(OPTIONS[0]);
  return (
    <SidebarContext.Provider value={{
      activeOption,
      setActiveOption,
      OPTIONS
    }}
    >{children}</SidebarContext.Provider>
  )
}
