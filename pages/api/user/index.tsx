import { firestore } from "../../../services/firebase/admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import { UserDB } from "@/types/User.interface";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const usersData: UserDB[] = []
      const users = await firestore
        .collection("user")
        .get()

      users.forEach((user: QueryDocumentSnapshot<UserDB>) => {
        const { email, isAdmin, uid } = user.data()
        const UserToPush: UserDB = {
          email,
          isAdmin,
          uid
        }
        usersData.push(UserToPush)
      }
      )
      usersData.sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      })

      res.status(200)
      res.json({ data: usersData })
    }
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
}