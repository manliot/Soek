import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../services/firebase/client";
import { toastLoading } from "../../services/toast/toast";


export const addImage = (reference: string, name: string, image: File): Promise<string> => {
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

export const deleteImageByUrl = (url: string): Promise<Boolean> => {

  const imagesRef = ref(storage, url);

  return new Promise((resolve, reject) => {
    toastLoading(deleteObject(imagesRef), 'Eliminando Imagen...', 'Imagen eliminada exitosamente', 'No se pudo eliminar la imagen')
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject(false)
      })
  })
}