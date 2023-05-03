import { useEffect } from "react";
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
import { Header } from "../../components/header";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import { ProductCard } from "../../components/productCard";
import { HomeProps } from "../../types/home/Home.interface";
import styles from "@/styles/home/Home.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase/client";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';

export default function Home({ products, aisles }: HomeProps) {
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
		<>
			<Head>
				<title>SOEK - Compra Eficiente</title>
			</Head>
			<Header />
			<main>
				<div className={styles.productCardContainer}>
					{dataProducts.length >= 0 &&
						dataProducts.map(product => <ProductCard product={product} key={product.id} />)
					}
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
