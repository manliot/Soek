import { firestore } from "../../../services/firebase/admin";
import { Product } from "@/types/Product.interface";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Products(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const productData: Product[] = []
      const products = await firestore
        .collection("product")
        .get()

      products.forEach(product => {
        const { aisle, name, brand, price, url_img } = product.data()
        const productToPush: Product = {
          id: product.id,
          aisle,
          name,
          brand,
          price,
          url_img
        }
        productData.push(productToPush)
      })
      console.log(productData)
      res.status(200)
      res.json({ data: productData })
    }
  } catch (error) {
    res.status(404)
    res.json({ error })
  }
}
