import { Product } from '@/types/Product.interface'
import styles from './styles.module.css'
import { getCurrencyNumber } from '@/services/formatServices/numberFormat'
import Image from 'next/image'
import { useShoppingBagContext } from '@/context/shoppingBag/shoppingBagContex'

export function ProductBag({ product }: { product: Product & { quantity: number } }) {
  const { addProductToShoppingBag, removeProductFromShoppingBag } = useShoppingBagContext()

  const handleMinusClic = () => {
    const { quantity, ..._product } = product
    removeProductFromShoppingBag(_product)
  }
  const handlePlusClic = () => {
    const { quantity, ..._product } = product
    addProductToShoppingBag(_product)
  }
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.productImage}
      >
        <Image
          alt='Imagen del producto'
          src={product.url_img}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div
        className={styles.productInfo}
      >
        <div className={styles.productInfoBrand}>
          <strong>{product.brand}</strong>
        </div>
        <div className={styles.productInfoName}>
          {product.name}
        </div>

      </div>
      <div
        className={styles.productQuantity}
      >
        <button
          onClick={handleMinusClic}>-</button>
        <p>{product.quantity}</p>
        <button
          onClick={handlePlusClic}>+</button>
      </div>
      <div
        className={styles.productTotalPrice}
      >
        <p>{getCurrencyNumber(product.quantity * Number(product.price))}</p>
      </div>
    </div>
  )
}
