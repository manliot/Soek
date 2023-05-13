import { firestore } from "../../../services/firebase/admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import { Comment } from "@/types/Comments.interface";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Comments(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const commentsData: Comment[] = []
      const comments = await firestore
        .collection("comments")
        .get()

      comments.forEach((commentDB: QueryDocumentSnapshot<Comment>) => {
        const { comment, createdAt, photoUrl, uid, userName } = commentDB.data()
        const CommentToPush: Comment = {
          comment,
          createdAt,
          photoUrl: photoUrl ? photoUrl : undefined,
          uid: uid ? uid : undefined,
          userName: userName ? userName : undefined
        }
        commentsData.push(CommentToPush)
      }
      )
      commentsData.sort((a, b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate())

      res.status(200)
      res.json({ data: commentsData })
    }
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
}