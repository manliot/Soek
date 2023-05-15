import Image from "next/image";
import { Product } from "../../types/Product.interface";
import styles from "./ProductCard.module.css";
import { getCurrencyNumber } from "../../services/formatServices/numberFormat";
import { useShoppingBagContext } from "@/context/shoppingBag/shoppingBagContex"

const defaultProduct: Product = {
  id: '',
  name: 'Nombre del producto',
  brand: 'Marca del producto',
  price: 1000,
  aisle: 'Numero del pasillo',
  aisleName: 'Nombre del pasillo',
  url_img: 'https://img.freepik.com/vector-gratis/maqueta-dispositivo-digital_53876-90966.jpg?w=2000',
}

export function ProductCard({ product = defaultProduct }: { product: Product }) {
  const { addProductToShoppingBag } = useShoppingBagContext()
  const handleClickAdd = () => {
    addProductToShoppingBag(product)
  }

  return (
    <article className={styles.cardContainer}>
      <div className={styles.img}>
        <Image
          src={product.url_img}
          alt={`${product.name} - ${product.aisle}`}
          fill={true}
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <div>
          <p className={styles.contentBrand}><strong>{product.brand} </strong></p>
          <h3 className={styles.contentBrand}>{product.name}</h3>
        </div>
        <div>
          <p><strong>{getCurrencyNumber(Number(product.price))}</strong></p>
          <p className={styles.aisleNumber}>Pasillo {product.aisleName.split(':')[0]}</p>
        </div>
      </div>
      <button className={styles.btn}
        onClick={handleClickAdd}>
        Agregar
      </button>
    </article>
  )
}
