import { auth, app } from './client'
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User, LoginUser } from "../../types/User.interface";
const provider = new GoogleAuthProvider();

const replaceEmpty = (value: string | null): string => {
  if (value)
    return value
  return ''
}

export const LoginWithGoogle = async (): Promise<LoginUser> => {
  const user: LoginUser = await new Promise(async (resolve, reject) => {
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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log({ errorCode, errorMessage, email, credential });
        reject({ errorCode, errorMessage, email, credential });
      });
  })
  return user;
}


export const Logout = async () => {
  await signOut(auth)
    .then(() => {
      alert('Salió exitosamente. Vuelve pronto') /// alertar en un toast
    }).catch((error) => {
      console.log(error)
    });
}