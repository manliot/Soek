import { useEffect } from "react";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import styles from "@/styles/config/Config.module.css";
import { Header } from "@/components/header";
import { ConfigSidebar } from "@/components/configSidebar";
import { ConfigContent } from "@/components/configContent";
import { SideBarContextProvider } from "@/context/sidebar/sideBarContext";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { GetServerSidePropsContext } from 'next';
import { HomeProps } from "../../types/home/Home.interface";

export default function Config({ products, aisles }: HomeProps) {
  const { updateProductStatus, dataProducts } = useProductContext();
  const { updateAislesStatus } = useAisleContext();

  useEffect(() => {
    const updateProducts = () => {
      updateProductStatus(products)
      updateAislesStatus(aisles)
    }
    updateProducts()
  }, [])

  return (
    <SideBarContextProvider>
      <Header />
      <main className={styles.main}>
        <ConfigSidebar />
        <div className={styles.contentContainer}>
          <ConfigContent />
        </div>
      </main>
    </SideBarContextProvider>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  let productData: Product[] = []
  let aisleData: AisleDB[] = []
  try {
    //get Products
    const resProducts = await fetch(`${BASE_URL}/api/product`)
    const { data: dataProducts }: { data: Product[] } = await resProducts.json()
    productData = [...dataProducts]

    //get Aisles
    const resAisles = await fetch(`${BASE_URL}/api/aisle`)
    const { data: dataAisles }: { data: AisleDB[] } = await resAisles.json()
    aisleData = [...dataAisles]

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

