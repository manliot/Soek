import { useEffect } from "react";
import Head from 'next/head'
import Header from "../../components/header";
import { Product } from '@/types/Product.interface';
import { AisleDB } from '@/types/Aisle.interface';
import ProductCard from "../../components/productCard";
import { HomeProps } from "./Home.interface";
import styles from "./Home.module.css";
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

export async function getServerSideProps(context) {
	//get Products
	const productData: Product[] = []
	const productsRef = collection(db, "product")
	const products = await getDocs(productsRef)

	products.forEach(product => {
		const { aisle, name, brand, price, url_img } = product.data()
		const productToPush: Product = {
			id: product.id,
			aisle,
			name,
			brand,
			price,
			url_img
		}

		productData.push(productToPush)
	})

	//get Aisles
	const aisleData: AisleDB[] = []
	const aislesRef = collection(db, "aisle")
	const aisles = await getDocs(aislesRef)

	aisles.forEach(aisle => {
		const { name, aisleNumber, urlPhoto } = aisle.data()
		const aisleToPush: AisleDB = {
			id: aisle.id,
			name: `${Number(aisleNumber)}: ${name}`,
			aisleNumber: Number(aisleNumber),
			urlPhoto
		}
		aisleData.push(aisleToPush)
	})

	aisleData.sort((a, b) => a.aisleNumber - b.aisleNumber)

	if (!products) {
		return {
			notFound: true,
		}
	}

	if (!aisles) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			products: productData,
			aisles: aisleData,
		}, // will be passed to the page component as props
	}
}
