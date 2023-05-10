import { createContext, useState, ReactNode } from "react";
import { Option } from "@/components/configSidebar/ConfigSidebar.interface";
import { AddIcon } from "@/assets/svg/AddIcon";
import { UpdateIcon } from "@/assets/svg/UpdateIcon";
import { DeleteIcon } from "@/assets/svg/DeleteIcon";
import { CommentsConfigIcon } from "@/assets/svg/CommentsConfigIcon";
import { UserConfigIcon } from "@/assets/svg/UserConfigIcon";
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
  },
  {
    option: 'Buzón de Sugerencias',
    icon: <CommentsConfigIcon fill_1="#000000" />
  },
  {
    option: 'Administrar Usuarios',
    icon: <UserConfigIcon fill_1="#000000" />
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
