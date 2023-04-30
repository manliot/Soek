import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ProductProvider } from '@/context/products/productContext'
import { AisleProvider } from '@/context/aisles/aislesContext'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <AisleProvider>
      <ProductProvider>
        <Component {...pageProps} />
        <Toaster />
      </ProductProvider>
    </AisleProvider>
  </>
}
