import { useState, useEffect } from 'react'
import { onAuthStateChanged } from '../services/firebase/googleAuth'
import { User } from '../types/User.interface'
export const USER_STATES = {
  NOT_LOGGED: {},
  NOT_KNOWN: undefined,
}

export function useUser(): User | undefined {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  return user
}
