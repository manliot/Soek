import { auth } from './client'
import { GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { toastMessage } from "../toast/toast";

/**
 * This function allow to login with google in firebase auth.
 * @returns user object from firebase auth
 */
export const LoginWithGoogle = (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider();

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then(async res => {
        resolve(res)
      })
      .catch(err => {
        toastMessage('error', `No se pudo iniciar sesión`)
        console.error('error: ', err)
        reject(false)
      })
  })
}

/**
 * This function allow to logout from firebase auth.
 * @returns true if logout was successful
 */
export const Logout = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(res => {
        const toastOptions = {
          icon: '🥺'
        }
        toastMessage('success', `Vuelve Pronto, te extrañaremos!`, toastOptions)
        resolve(true)
      })
      .catch(err => {
        toastMessage('error', `No se pudo cerrar sesión`)
        reject(false)
      })
  })
}