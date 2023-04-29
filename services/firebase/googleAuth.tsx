import { auth, app } from './client'
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User, LoginUser } from "../../types/User.interface";

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

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged(user => {
    const normalizedUser = user
      ? mapUserFromFirebaseAuthToUser(user)
      : {} as User
    onChange(normalizedUser)
  })
}


export const LoginWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider)
    return result
  } catch (error) {
    console.log(error)
    //TOAST
  }
}



export const Logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
    //TOAST
  }

}