import { useContext } from "react";
import { AddProduct } from "../addProduct";
import { UpdateProduct } from "../updateProduct";
import { DeleteProduct } from "../deleteProduct";
import { SidebarContext } from "@/context/sidebar/sideBarContext";

export default function ConfigContent() {
  const { activeOption } = useContext(SidebarContext)
  return (
    <div>{OPTIONS[activeOption.option]}</div>
  )
}


const OPTIONS: { [key: string]: JSX.Element } = {
  'Ingresar Producto': <AddProduct />,
  'Actualizar Producto': <UpdateProduct />,
  'Eliminar Producto': <DeleteProduct />
}