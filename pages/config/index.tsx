import { useEffect } from "react";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import styles from "@/styles/config/Config.module.css";
import { Header } from "@/components/header";
import { ConfigSidebar } from "@/components/configSidebar";
import { ConfigContent } from "@/components/configContent";
import { useSidebarContext } from "@/context/sidebar/sideBarContext";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { GetServerSidePropsContext } from 'next';
import { HomeProps } from "../../types/home/Home.interface";
import Head from 'next/head'
import { Comment } from "@/types/Comments.interface";
import { UserDB } from "@/types/User.interface";
import { useAuthContext } from "@/context/auth/authContext";

export default function Config({ products, aisles, comments, users }: HomeProps) {
  const { updateProductState: updateProductStatus } = useProductContext();
  const { updateAislesStatus } = useAisleContext();
  const { setComments, setUsers } = useSidebarContext();
  const { user } = useAuthContext()

  useEffect(() => {
    const updateProducts = () => {
      updateProductStatus(products)
      updateAislesStatus(aisles)
      setComments(comments || [])
      setUsers(users || [])
    }
    updateProducts()
  }, [])

  return (
    <div>
      {!user?.uid
        ? <div>
          <p>No tienes permisos para acceder a esta página☹️</p>
        </div>
        : <>
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
      }
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  let productData: Product[] = []
  let aisleData: AisleDB[] = []
  let commentData: Comment[] = []
  let userData: UserDB[] = []
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

    //get Users
    const resUsers = await fetch(`${BASE_URL}/api/user`)
    const { data: dataUsers }: { data: UserDB[] } = await resUsers.json()
    userData = [...dataUsers]

    return {
      props: {
        products: productData,
        aisles: aisleData,
        comments: commentData,
        users: userData,
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true, }
  }
}

