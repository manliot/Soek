import { firestore } from "../../../services/firebase/admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import { AisleDB } from "@/types/Aisle.interface";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Aisles(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const aislesData: AisleDB[] = []
      const aisles = await firestore
        .collection("aisle")
        .get()

      aisles.forEach((aisle: QueryDocumentSnapshot<AisleDB>) => {
        const { name, aisleNumber, urlPhoto } = aisle.data()
        const aisleToPush: AisleDB = {
          id: aisle.id,
          name: `${Number(aisleNumber)}: ${name}`,
          aisleNumber: Number(aisleNumber),
          urlPhoto
        }
        aislesData.push(aisleToPush)
      }
      )
      aislesData.sort((a, b) => a.aisleNumber - b.aisleNumber)

      res.status(200)
      res.json({ data: aislesData })
    }
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
}