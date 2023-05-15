import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ProductProvider } from '@/context/products/productContext'
import { AisleProvider } from '@/context/aisles/aislesContext'
import { ShoppingBagProvider } from '@/context/shoppingBag/shoppingBagContex'
import Head from 'next/head'
import { AuthProvider } from '@/context/auth/authContext'
import { SideBarContextProvider } from '@/context/sidebar/sideBarContext'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>SOEK - Compra Facil</title>
      <meta name="description" content="Compra Eficiente" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AuthProvider>
      <AisleProvider>
        <ProductProvider>
          <ShoppingBagProvider>
          <SideBarContextProvider>
            <Component {...pageProps} />
            <Toaster />
            </SideBarContextProvider>
          </ShoppingBagProvider>
        </ProductProvider>
      </AisleProvider>
    </AuthProvider>
  </>
}
