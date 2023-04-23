import Head from 'next/head'
import Header from "../../components/header";
import { Product } from '@/components/productCard/Product.interface';
import ProductCard from "../../components/productCard";
import { HomeProps } from "./Home.interface";
import styles from "./Home.module.css";

export default function Home({ products }: HomeProps) {
	return (
		<>
			<Head>
				<title>SOEK - Compra Eficiente</title>
			</Head>
			<Header />
			<main>
				<div className={styles.productCardContainer}>
					{products.length >= 0 &&
						products.map(product => <ProductCard product={product} key={product.id} />)
					}
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps(context) {
	const res = await fetch(`http://localhost:3000/api/products`)
	const products: Product[] = await res.json()
	if (!products) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			products
		}, // will be passed to the page component as props
	}
}

