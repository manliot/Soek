import { useContext } from "react";
import { AddProduct } from "../addProduct";
import { UpdateProduct } from "../updateProduct";
import { DeleteProduct } from "../deleteProduct";
import { SidebarContext } from "@/context/sidebar/sideBarContext";
import { ViewComments } from "../viewComments";
import UserAdministration from "../userAdministration";

export function ConfigContent() {
  const { activeOption } = useContext(SidebarContext)
  return (
    <>{OPTIONS[activeOption.option]}</>
  )
}

const OPTIONS: { [key: string]: JSX.Element } = {
  'Ingresar Producto': <AddProduct />,
  'Actualizar Producto': <UpdateProduct />,
  'Eliminar Producto': <DeleteProduct />,
  'Buzón de Sugerencias': <ViewComments />,
  'Administrar Usuarios': <UserAdministration />,
}