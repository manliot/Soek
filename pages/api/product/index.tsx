import { firestore } from "../../../services/firebase/admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import { Product } from "@/types/Product.interface";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Products(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const productData: Product[] = []
      const products = await firestore
        .collection("product")
        .get()

      products.forEach((product: QueryDocumentSnapshot<Product>) => {
        const { aisle, name, brand, price, url_img } = product.data()
        const productToPush: Product = {
          id: product.id,
          aisle,
          aisleName: '',
          name,
          brand,
          price,
          url_img
        }
        productData.push(productToPush)
      })
      res.status(200)
      res.json({ data: productData })
    }
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
}
