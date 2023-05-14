export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  isAdmin: boolean;
}

export interface LoginUser {
  user: User
  token: string;
}

export interface UserDB {
  uid: string;
  isAdmin: boolean;
  email: string;
}