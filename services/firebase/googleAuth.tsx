import { auth, app } from './client'
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User, LoginUser } from "../../types/User.interface";
import { toastMessage } from "../toast/toast";

const replaceEmpty = (value: string | null): string => {
  if (value)
    return value
  return ''
}

const mapUserFromFirebaseAuthToUser = (user: User): User => {
  const { displayName, email, photoURL, uid } = user

  return {
    displayName,
    email,
    photoURL,
    uid
  }
}

export const onAuthStateChanged = (onChange: (user: User) => void) => {
  return auth.onAuthStateChanged(user => {
    const normalizedUser = user
      ? mapUserFromFirebaseAuthToUser(user as User)
      : {} as User
    onChange(normalizedUser)
  })
}


export const LoginWithGoogle = (): Promise<boolean> => {
  const googleProvider = new GoogleAuthProvider();
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then(res => {
        const toastOptions = {
          icon: '👋'
        }
        toastMessage('success', `Bienvenid@ ${res.user.displayName} !`, toastOptions)
        resolve(true)
      })
      .catch(err => {
        toastMessage('error', `No se pudo iniciar sesión`)
        console.log('err', err)
        reject(false)
      })
  })
}



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