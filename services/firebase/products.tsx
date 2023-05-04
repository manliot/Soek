import { db } from "../../services/firebase/client";
import { toastLoading, toastMessage } from "../../services/toast/toast";
import { collection, updateDoc, addDoc, doc } from "firebase/firestore";
import { ProductToAdd } from "@/types/Product.interface";
import { addImage, deleteImageByUrl } from "./images";


export const addProduct = async (product: ProductToAdd) => {
  try {
    product.url_img = await addImage('images', product.file_img!.name, product.file_img!)

    const { file_img, ...productToAdd } = product
    await toastLoading(addDoc(collection(db, "product"), productToAdd), 'Guardando Producto', 'Producto guardado exitosamente', 'No se pudo guardar el producto')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}


export const updateProduct = async (product: ProductToAdd) => {
  try {
    const productReference = doc(db, "product", product.id || '')
    if (productReference) {
      if (product.file_img) {
        toastMessage("info", "Se procederá a actualizar la imagen del producto", { icon: '🫡' })
        const lastUrl = product.url_img
        product.url_img = await addImage('images', product.file_img.name, product.file_img)

        toastMessage("info", "Se procederá a eliminar la imagen anterior del producto", { icon: '🫡' })
        deleteImageByUrl(lastUrl)
      }
      const { file_img, ...productToAdd } = product
      await toastLoading(updateDoc(productReference, productToAdd), 'Actualizando Producto...', 'Producto actualizado exitosamente', 'No se pudo actualizar el producto')
    } else
      toastMessage('error', 'No se encontró el producto a actualizar')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}
