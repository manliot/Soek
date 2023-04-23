// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from "../../components/productCard/Product.interface";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products)
}

const products = [
  {
    "id": 1,
    "name": "MacBook Pro",
    "brand": "Apple",
    "price": 1799.99,
    "category": "Computers",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  },
  {
    "id": 2,
    "name": "Galaxy S21",
    "brand": "Samsung",
    "price": 799.99,
    "category": "Smartphones",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  },
  {
    "id": 3,
    "name": "PlayStation 5",
    "brand": "Sony",
    "price": 499.99,
    "category": "Gaming Consoles",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  },
  {
    "id": 4,
    "name": "AirPods Pro",
    "brand": "Apple",
    "price": 249.99,
    "category": "Headphones",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  },
  {
    "id": 5,
    "name": "GTX 3080",
    "brand": "Nvidia",
    "price": 699.99,
    "category": "Computer Components",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  },
  {
    "id": 6,
    "name": "Tesla Model S",
    "brand": "Tesla",
    "price": 79990.00,
    "category": "Cars",
    "url_img": "https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000"
  }
]