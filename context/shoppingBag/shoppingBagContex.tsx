import { useContext, createContext, ReactNode, useState } from "react";
import { AisleDB } from "@/types/Aisle.interface";
import { Product } from "@/types/Product.interface";
import { useAisleContext } from '@/context/aisles/aislesContext'
import { toastMessage } from "@/services/toast/toast";

const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export function ShoppingBagProvider({ children }: { children: ReactNode }) {
  const [shoppingBag, setShoppingBag] = useState<ShoppingBagInterface[]>([])
  const { dataAisles } = useAisleContext()

  const getShoppingBag = () => {
    return shoppingBag.sort((a, b) => a.aisle.aisleNumber - b.aisle.aisleNumber)
  }

  const addProductToShoppingBag = (product: Product) => {
    const shoppingBagCopy = shoppingBag.slice()

    //first we need to find the aisle of the  product, if it exist we will find if products was added, 
    //if it was added we will increase the quantity, if not we will add the product to the aisle
    // if the aisle doesn't exist we will add a new element in shoppingBagCopy
    const aisle = shoppingBagCopy.find((aisle) => aisle.aisle.id === product.aisle)

    if (aisle) {
      const productInAisle = aisle.products.find(productInAisle => productInAisle.id === product.id)
      productInAisle
        ? productInAisle.quantity += 1
        : aisle.products.push({ ...product, quantity: 1 })

    } else {
      const Aisle = dataAisles.find((aisle) => aisle.id === product.aisle)
      Aisle
        ? shoppingBagCopy.push({ aisle: Aisle, products: [{ ...product, quantity: 1 }] })
        : toastMessage('error', 'No se encontró el pasillo del producto')
    }
    setShoppingBag(shoppingBagCopy)
  }

  const removeProductFromShoppingBag = (product: Product) => {
    const shoppingBagCopy = shoppingBag.slice()

    const aisleIndex = shoppingBagCopy.findIndex(aisle => aisle.aisle.id === product.aisle)
    if (aisleIndex === -1) {
      toastMessage('error', 'No se encontró el pasillo del producto')
    } else {
      const productIndex = shoppingBagCopy[aisleIndex].products.findIndex(productInAisle => productInAisle.id === product.id)
      if (productIndex === -1) {
        toastMessage('error', 'No se encontró el producto')
      } else {
        const productInAisle = shoppingBagCopy[aisleIndex].products[productIndex]
        productInAisle.quantity > 1
          ? productInAisle.quantity -= 1
          : shoppingBagCopy[aisleIndex].products.splice(productIndex, 1)
        if (shoppingBagCopy[aisleIndex].products.length === 0) {
          shoppingBagCopy.splice(aisleIndex, 1)
        }
      }
    }
    setShoppingBag(shoppingBagCopy)
  }

  const getTotals = (): { total: number, totalItems: number } => {
    let total = 0
    let totalItems = 0
    shoppingBag.forEach(aisle => {
      aisle.products.forEach(product => {
        total += Number(product.price) * product.quantity
        totalItems += product.quantity
      })
    })

    return { total, totalItems }
  }


  return (
    <ShoppingBagContext.Provider
      value={{
        getShoppingBag,
        addProductToShoppingBag,
        removeProductFromShoppingBag,
        getTotals,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  )
}

export function useShoppingBagContext() {
  return useContext(ShoppingBagContext);
}

interface ShoppingBagContextProps {
  getShoppingBag: () => ShoppingBagInterface[];
  addProductToShoppingBag: (product: Product) => void;
  removeProductFromShoppingBag: (product: Product) => void;
  getTotals: () => { total: number, totalItems: number };
}
interface ShoppingBagInterface {
  aisle: AisleDB;
  products: (Product & { quantity: number })[];
}

