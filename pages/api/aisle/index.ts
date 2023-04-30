import { firestore } from "../../../services/firebase/admin";
import { AisleDB } from "@/types/Aisle.interface";

/* export default async function getAllAisles(req, res) {
  try {
    const aislesData: AisleDB[] = []
    const aisles = await firestore
      .collection("aisle")
      .get()
    aisles.forEach(aisle => { aislesData.push(aisle.data()) })
    res.json({ data: aislesData })
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
} */
