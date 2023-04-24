export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string
}

export interface LoginUser {
  user: User
  token: string;
}