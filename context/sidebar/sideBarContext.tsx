import { createContext, useState, ReactNode, useContext } from "react";
import { Option } from "@/components/configSidebar/ConfigSidebar.interface";
import { AddIcon } from "@/assets/svg/AddIcon";
import { UpdateIcon } from "@/assets/svg/UpdateIcon";
import { DeleteIcon } from "@/assets/svg/DeleteIcon";
import { CommentsConfigIcon } from "@/assets/svg/CommentsConfigIcon";
import { UserConfigIcon } from "@/assets/svg/UserConfigIcon";
import { SidebarContextType } from "./sideBarContext.interface";
import { Comment } from "@/types/Comments.interface";
import { UserDB } from "@/types/User.interface";


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
  comments: [],
  setComments: () => { },
  users: [],
  setUsers: () => { }
};


export const SidebarContext = createContext(defaultValues)

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export const SideBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeOption, setActiveOption] = useState(OPTIONS[0]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<UserDB[]>([]);

  return (
    <SidebarContext.Provider value={{
      activeOption,
      setActiveOption,
      OPTIONS,
      comments,
      setComments,
      users,
      setUsers
    }}
    >{children}</SidebarContext.Provider>
  )
}
