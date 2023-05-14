import { useEffect } from "react";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import styles from "@/styles/config/Config.module.css";
import { Header } from "@/components/header";
import { ConfigSidebar } from "@/components/configSidebar";
import { ConfigContent } from "@/components/configContent";
import { SideBarContextProvider, useSidebarContext } from "@/context/sidebar/sideBarContext";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { GetServerSidePropsContext } from 'next';
import { HomeProps } from "../../types/home/Home.interface";
import Head from 'next/head'
import { Comment } from "@/types/Comments.interface";

export default function Config({ products, aisles, comments }: HomeProps) {
  const { updateProductState: updateProductStatus } = useProductContext();
  const { updateAislesStatus } = useAisleContext();
  const { setComments } = useSidebarContext();

  useEffect(() => {
    const updateProducts = () => {
      updateProductStatus(products)
      updateAislesStatus(aisles)
      setComments(comments || [])
    }
    updateProducts()
  }, [])

  return (
  <>
   
      <Head>
        <title>Configuración</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <ConfigSidebar />
        <div className={styles.contentContainer}>
          <ConfigContent />
        </div>
      </main>
      </> 
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  let productData: Product[] = []
  let aisleData: AisleDB[] = []
  let commentData: Comment[] = []
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

    //get Comments
    const resComments = await fetch(`${BASE_URL}/api/comment`)
    const { data: dataComments }: { data: Comment[] } = await resComments.json()
    commentData = [...dataComments]

    return {
      props: {
        products: productData,
        aisles: aisleData,
        comments: commentData,
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true, }
  }
}

