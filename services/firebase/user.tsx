import { User } from "@/types/User.interface";
import { db } from "../../services/firebase/client";
import { toastLoading, toastMessage } from "../../services/toast/toast";
import { collection, updateDoc, addDoc, doc, getDocs, query, where } from "firebase/firestore";

/** 
 * asing isAdmin: false by default, the uid is the same as the user.uid (from firebase auth)
 * This function creates a new user in collection 'user' in firestore.
 * @param: user: User - user object with uid and isAdmin
 * */
export const createUser = async (user: User) => {
  console.log('new user: ', user)
  try {
    await toastLoading(addDoc(collection(db, "user"), { uid: user.uid, isAdmin: false }), 'Creando usuario...', 'Usuario ha sido creado exitosamente', 'No se pudo crear tu usuario')
  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}

/**
 * This function allow to upgrade a user to admin.
 * @param: user: User - user object with uid and isAdmin
 * */
export const upgradeToAdmin = async (user: User) => {
  try {
    const userReference = doc(db, "user", user.uid || '')
    if (userReference) {
      await toastLoading(updateDoc(userReference, { ...user, isAdmin: true }), 'Actualizando Usuario...', 'Ahora tienes permiso de administrador', 'No se pudo actualizar el usuario')
    } else
      toastMessage('error', 'No se encontró el usuario a actualizar')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error, intente nuevamente')
  }
}

/**
 * This function allow to downgrade a user to user.
 * @param: user: User - user object with uid and isAdmin
 * */
export const downgradeToUser = async (user: User) => {
  try {
    const userReference = doc(db, "user", user.uid || '')
    if (userReference) {
      await toastLoading(updateDoc(userReference, { ...user, isAdmin: false }), 'Actualizando Usuario...', 'Tus permisos de administrador han sido revocados', 'No se pudo actualizar el usuario')
    } else
      toastMessage('error', 'No se encontró el usuario a actualizar')

  } catch (error) {
    toastMessage('error', 'Ocurrió un error al quitar permisos de administrador, intente nuevamente')
  }
}

/**
 * This function allow to get a user from firestore by uid.
 * @param uid - user id
 * @returns user object from firestore
 */
export const getUserDBbyId = async (uid: string): Promise<{ uid: string, isAdmin: boolean }> => {
  try {
    const q = query(collection(db, "user"), where("uid", "==", uid));
    const userDb = await getDocs(q)
    if (userDb) {
      return userDb.docs[0].data() as { uid: string, isAdmin: boolean }
    } else
      toastMessage('error', 'No se encontró el usuario')
    return {} as { uid: string, isAdmin: boolean }
  } catch (error) {
    console.log('error: ', error)
    toastMessage('error', 'Ocurrió un error al obtener el usuario, intente nuevamente')
    return {} as { uid: string, isAdmin: boolean }
  }
}