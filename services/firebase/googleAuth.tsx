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
    console.log('user', user)
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

/* const user: LoginUser = await new Promise(async (resolve, reject) => {
  await signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || '';

      const user: User = {
        'displayName': replaceEmpty(result.user.displayName),
        'email': replaceEmpty(result.user.email),
        'uid': replaceEmpty(result.user.uid),
        'photoURL': replaceEmpty(result.user.photoURL)
      }
      resolve({ user, token });
    }).catch((error) => {
  
    });
})
return user; */


export const Logout = async () => {
  await signOut(auth)
    .then(() => {
      alert('Salió exitosamente. Vuelve pronto') /// alertar en un toast
    }).catch((error) => {
      console.log(error)
    });
}