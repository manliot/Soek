import { useEffect } from 'react'
import Head from 'next/head'
import { Header } from "../../components/header";
import styles from "@/styles/aisles/styles.module.css";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { GetServerSidePropsContext } from 'next';
import { HomeProps } from "../../types/home/Home.interface";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import { AislesCard } from "@/components/aislesCard";

export default function Aisles({ products, aisles }: HomeProps) {
  const { updateProductState } = useProductContext();
  const { updateAislesStatus, getAislesList, resetFilteredAisles } = useAisleContext();

  useEffect(() => {
    const fillInfo = () => {
      updateProductState(products)
      updateAislesStatus(aisles)
    }
    fillInfo()
    resetFilteredAisles()
  }, [])


  return (
    <>
      <Head>
        <title>SOEK - Compra Eficiente</title>
      </Head>
      <Header />
      <main
        className={styles.main}
      >
        <div
          className={styles.container}
        >
          <p
            className={styles.title}
          >Todos los pasillos</p>
          <div
            className={styles.aislesCardContainer}
          >
            {getAislesList().map(aisle => <AislesCard aisle={aisle} key={aisle.id} type='all' />)
            }
          </div>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  let productData: Product[] = []
  let aisleData: AisleDB[] = []
  try {
    //get Products
    let tempProductData: Product[] = []
    const resProducts = await fetch(`${BASE_URL}/api/product`)
    const { data: dataProducts }: { data: Product[] } = await resProducts.json()
    tempProductData = [...dataProducts]

    //get Aisles
    const resAisles = await fetch(`${BASE_URL}/api/aisle`)
    const { data: dataAisles }: { data: AisleDB[] } = await resAisles.json()
    aisleData = [...dataAisles]

    //fill aisleName
    productData = tempProductData.map(product => {
      const aisle = aisleData.find(aisle => aisle.id === product.aisle)
      product.aisleName = aisle?.name || ''
      return product
    })

    return {
      props: {
        products: productData,
        aisles: aisleData,
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true, }
  }
}

