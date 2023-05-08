import Head from "next/head"
import { useShoppingBagContext } from "@/context/shoppingBag/shoppingBagContex"
import { Header } from "@/components/header"
import styles from "@/styles/shopping-bag/styles.module.css"
import { getCurrencyNumber } from "@/services/formatServices/numberFormat";
import { AisleBag } from "@/components/aisleBag";
import { ProductBag } from "@/components/productBag";

export default function ShoppingBag() {
  const { getShoppingBag: shoppingBag, getTotals } = useShoppingBagContext()
  const { total } = getTotals()

  return (
    <>
      <Head>
        <title>Canasta</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleTotal}>
            <h1>Canasta</h1>
            {shoppingBag().length > 0 &&
              <p>Total a pagar: <strong>{getCurrencyNumber(total)}</strong></p>
            }
          </div>

          {shoppingBag().length > 0
            ? shoppingBag().map(item => {
              return (
                <>
                  <AisleBag
                    aisle={item.aisle}
                    key={item.aisle.id}
                  />
                  <div
                    className={styles.productsContainer}
                  >
                    {item.products.map(product => {
                      return (
                        <ProductBag product={product} key={product.id} />
                      )
                    })}
                  </div>
                </>
              )
            })
            : <p style={{ marginTop: '20px' }}>No hay productos en la canasta de compra, Comienza a añadirlos... 😊</p>
          }
        </div>
      </main>
    </>
  )
}
