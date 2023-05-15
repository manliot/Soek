import { Comment } from "@/types/Comments.interface";
import { db } from "../../services/firebase/client";
import { toastLoading, toastMessage } from "../../services/toast/toast";
import { collection, addDoc } from "firebase/firestore";

/** 
 * This function creates a new comment in collection 'comments' in firestore.
 * @param: comment: Comments - comment object with uid, createdAt, userName and comment
 * */
export const createComment = async (comment: Comment) => {

  try {
    await toastLoading(addDoc(collection(db, "comments"), comment), 'Guardado sugerencia...', 'Sugerencia guardada exitosamente', 'No se pudo guardar tu sugerencia')
  } catch (error) {
    console.error(error)
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}