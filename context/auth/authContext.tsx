import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types/User.interface";
import { LoginWithGoogle, Logout } from "@/services/firebase/googleAuth";
import { UserCredential, getAdditionalUserInfo } from "firebase/auth";
import { createUser, getUserDBbyId } from "@/services/firebase/user";
import { toastMessage } from "@/services/toast/toast";


export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);

  /**
   * This Function allow to map user from firebase auth to user object.
   * @param user user object from firebase auth
   */
  const mapUserFromFirebaseAuthToUser = (user: User): User => {
    const { displayName, email, photoURL, uid, isAdmin } = user
    return {
      displayName,
      email,
      photoURL,
      uid,
      isAdmin,
    }
  }

  /**
   * This function allow to login with google. Call LoginWithGoogle() GoogleAuth service.
   */
  const login = async () => {
    const userCredential = await LoginWithGoogle()
    const normalizedUser = mapUserFromFirebaseAuthToUser({ ...userCredential.user, isAdmin: false } as User)
    const newUser = await createUserWhenIsNew(userCredential)

    const toastOptions = {
      icon: '👋'
    }
    if (newUser) {
      toastMessage('success', `Bienvenid@ ${normalizedUser.displayName}, ahora puedes realizar tus compras de manera eficiente`, toastOptions)
    } else
      toastMessage('success', `Bienvenid@ nuevamente ${normalizedUser.displayName} !`, toastOptions)

    //update user with isAdmin from firestore
    const userDb: { uid: string, isAdmin: boolean } = await getUserDBbyId(normalizedUser.uid)

    normalizedUser.isAdmin = userDb.isAdmin
    setUser(normalizedUser)
  }

  /**
   * This function allow to create user when is new.
   * @param res UserCredential from firebase auth
   * @returns true if user is new
   */
  const createUserWhenIsNew = async (res: UserCredential): Promise<boolean> => {
    const aditionalInfo = getAdditionalUserInfo(res)

    if (res.user && aditionalInfo?.isNewUser) {
      const user = mapUserFromFirebaseAuthToUser({ ...res.user, isAdmin: false } as User)
      await createUser(user)
      return true
    }
    return false

  }

  /**
   * This function allow to logout. Call Logout() GoogleAuth service.
   */
  const logout = async () => {
    Logout().then(res => {
      if (res)
        setUser({} as User)
    })
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export interface AuthContextProps {
  user: User;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}