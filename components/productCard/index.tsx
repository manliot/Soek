import Image from "next/image";
import { Product } from "../../types/Product.interface";
import styles from "./ProductCard.module.css";
import { getCurrencyNumber } from "../../services/formatServices/numberFormat";
const defaultProduct: Product = {
  id: '',
  name: 'Nombre del producto',
  brand: 'Marca del producto',
  price: 1000,
  aisle: 'Categoria del producto',
  url_img: 'https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000',
}

export function ProductCard({ product = defaultProduct }: { product: Product }) {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.img}>
        <Image
          src={product.url_img}
          alt={`${product.name} - ${product.aisle}`}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.contentBrand}><strong>{product.brand} </strong></p>
        <h3 className={styles.contentBrand}>{product.name}</h3>
        <p>{product.aisle}</p>
        <br></br>
        <p><strong>{getCurrencyNumber(Number(product.price))}</strong></p>
      </div>
      <button className={styles.btn}>
        Agregar
      </button>
    </article>
  )
}
