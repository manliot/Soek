import { useEffect } from "react";
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
import { Header } from "../../components/header";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { ProductCard } from "../../components/productCard";
import { HomeProps } from "../../types/home/Home.interface";
import styles from "@/styles/home/Home.module.css";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import { AislesCard } from "@/components/aislesCard";
import { NotProducts } from "@/components/notProducts";
import { ShowAllAisles } from "@/components/showAllAisles";
import Comments from "@/components/commets";
import Tutorial from "@/components/tutorial";
import { Credits } from "@/components/credits";

export default function Home({ products, aisles }: HomeProps) {
	const { updateProductState, getFilteredProducts } = useProductContext();
	const { updateAislesStatus, getAislesList, updateFilteredAisles } = useAisleContext();

	useEffect(() => {
		const updateProducts = () => {
			updateProductState(products)
			updateAislesStatus(aisles)
		}
		updateProducts()
	}, [])


	return (
		<>
			<Head>
				<title>SOEK - Compra Eficiente</title>
			</Head>
			<Header />
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.aislesCardContainer}>
						<ShowAllAisles />
						{getAislesList().map(aisle => <AislesCard aisle={aisle} key={aisle.id} type='minimal' />)}
					</div>
					{getFilteredProducts().length > 0
						? <div className={styles.productCardContainer}>
							{getFilteredProducts().map(product => <ProductCard product={product} key={product.id} />)}
						</div>
						: <div className={styles.containerNotProducts}>
							<NotProducts />
						</div>
					}
				</div>
			</main>
			<Tutorial />
			<Comments />
			<Credits></Credits>
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
