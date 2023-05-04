import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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