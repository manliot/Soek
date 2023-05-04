import { db } from "../../services/firebase/client";
import { toastLoading, toastMessage } from "../../services/toast/toast";
import { collection, addDoc } from "firebase/firestore";
import { ProductToAdd } from "@/types/Product.interface";
import { addImage } from "./images";


export const addProduct = async (product: ProductToAdd) => {
  try {
    product.url_img = await addImage('images', product.file_img.name, product.file_img)

    const { file_img, ...productToAdd } = product
    await toastLoading(addDoc(collection(db, "product"), productToAdd), 'Guardando Producto', 'Producto guardado exitosamente', 'No se pudo guardar el producto')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}