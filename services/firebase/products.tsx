import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/firebase/client";
import { toastLoading, toastMessage } from "../../services/toast/toast";
import { collection, addDoc } from "firebase/firestore";
import { ProductToAdd } from "@/types/Product.interface";



export const addProduct = async (product: ProductToAdd) => {
  try {
    product.url_img = await addImage('images', product.file_img.name, product.file_img)

    const { file_img, ...productToAdd } = product
    await toastLoading(addDoc(collection(db, "product"), productToAdd), 'Guardando Producto', 'Producto guardado exitosamente', 'No se pudo guardar el producto')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}

const addImage = (reference: string, name: string, image: File): Promise<string> => {
  const date = new Date().toISOString()
  const imagesRef = ref(storage, `${reference}/${date}_${name}`);
  return new Promise((resolve, reject) => {
    toastLoading(uploadBytes(imagesRef, image), 'Guardando Imagen', 'Imagen guardada exitosamente', 'No se pudo guardar la imagen')
      .then(res => {
        resolve(getDownloadURL(res.ref))
      })
      .catch(err => {
        reject(err)
      })
  })
}